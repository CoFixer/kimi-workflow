# {PROJECT_NAME} — Frontend-to-API Integration Map

> Last updated: {DATE}

---

## Routing Strategy

- Single consolidated dashboard with role-based routing (`/admin/*`, `/ops/*`, `/organizer/*`)
- Shared components, unified navigation, single auth context

---

## Screen-to-API Mapping

### Auth Screens

| HTML File | Route | Frontend | API Endpoints | Status |
|-----------|-------|----------|---------------|--------|
| login.html | /login | frontend | POST /api/v1/auth/login | ⬜ |
| signup.html | /signup | frontend | POST /api/v1/auth/register | ⬜ |
| forgot-password.html | /forgot-password | frontend | POST /api/v1/auth/forgot-password | ⬜ |

### User Screens

| HTML File | Route | Frontend | API Endpoints | Status |
|-----------|-------|----------|---------------|--------|
| profile.html | /profile | frontend | GET /api/v1/users/me, PATCH /api/v1/users/me | ⬜ |

### Dashboard Screens

| HTML File | Route | Frontend | API Endpoints | Role Access | Status |
|-----------|-------|----------|---------------|-------------|--------|
| admin-dashboard.html | /admin/dashboard | dashboard | TBD | admin | ⬜ |

---

## Integration Checklist

- [ ] All screens mapped to API endpoints
- [ ] Loading states handled
- [ ] Error states handled
- [ ] Auth guards in place
- [ ] Role-based access enforced
