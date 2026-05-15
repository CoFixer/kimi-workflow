# {PROJECT_NAME} — API Documentation

> Last updated: {DATE}

---

## Base URL

| Environment | URL |
|-------------|-----|
| Development | `http://localhost:{BACKEND_PORT}` |
| Staging | TBD |
| Production | TBD |

---

## Auth Endpoints

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/v1/auth/register` | Register new user | No |
| POST | `/api/v1/auth/login` | Login | No |
| POST | `/api/v1/auth/refresh` | Refresh access token | No |
| POST | `/api/v1/auth/logout` | Logout | Yes |
| POST | `/api/v1/auth/forgot-password` | Request password reset | No |
| POST | `/api/v1/auth/reset-password` | Reset password | No |

---

## User Endpoints

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/v1/users/me` | Get current user | Yes |
| PATCH | `/api/v1/users/me` | Update current user | Yes |
| GET | `/api/v1/users` | List users (admin) | Yes (Admin) |
| GET | `/api/v1/users/:id` | Get user by ID (admin) | Yes (Admin) |

---

## [Module] Endpoints

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/v1/[module]` | List | Yes |
| POST | `/api/v1/[module]` | Create | Yes |
| GET | `/api/v1/[module]/:id` | Get by ID | Yes |
| PATCH | `/api/v1/[module]/:id` | Update | Yes |
| DELETE | `/api/v1/[module]/:id` | Delete | Yes |

---

## Common Response Formats

### Success

```json
{
  "success": true,
  "data": {},
  "message": "Operation successful"
}
```

### Error

```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Human readable message"
  }
}
```

---

## Pagination

All list endpoints support:

| Query Param | Default | Description |
|-------------|---------|-------------|
| `page` | 1 | Page number |
| `limit` | 10 | Items per page |
| `sort` | created_at | Sort field |
| `order` | desc | asc / desc |

Response includes:

```json
{
  "data": [],
  "meta": {
    "page": 1,
    "limit": 10,
    "total": 100,
    "totalPages": 10
  }
}
```
