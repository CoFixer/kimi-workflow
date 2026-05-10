# Frontend Authentication

How authentication works in the StorePilot frontend.

## Flow

1. User logs in via `/login`
2. Backend returns JWT token
3. Frontend stores token in localStorage
4. Token sent with every API request via `Authorization` header
5. Token refreshed automatically when near expiry

## Implementation

### Login

```typescript
// routes/login.tsx
export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const credentials = Object.fromEntries(formData);
  
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });
  
  if (!response.ok) return json({ error: 'Invalid credentials' });
  
  const { data } = await response.json();
  localStorage.setItem('token', data.token);
  
  return redirect('/dashboard');
}
```

### API Client

```typescript
// lib/api.ts
export async function apiClient(endpoint: string, options: RequestInit = {}) {
  const token = localStorage.getItem('token');
  
  const response = await fetch(`/api${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
  });
  
  if (response.status === 401) {
    localStorage.removeItem('token');
    window.location.href = '/login';
  }
  
  return response;
}
```

### Protected Route

```typescript
// routes/dashboard.tsx
export async function loader() {
  const token = localStorage.getItem('token');
  if (!token) return redirect('/login');
  
  const user = await getCurrentUser();
  return json({ user });
}
```

## Notes

- Token expiry handled automatically
- Logout clears token and redirects
- 401 responses trigger logout
