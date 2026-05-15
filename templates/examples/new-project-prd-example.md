# Example: PRD-to-Doc Extraction Format

## Example API Endpoints

### Auth Module

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/v1/auth/register` | Register | No |
| POST | `/api/v1/auth/login` | Login | No |

### Resource Module

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/v1/resources` | List | Yes |
| POST | `/api/v1/resources` | Create | Yes |
| GET | `/api/v1/resources/:id` | Get | Yes |
| PATCH | `/api/v1/resources/:id` | Update | Yes |
| DELETE | `/api/v1/resources/:id` | Delete | Yes |

---

## Example HTML-PRD Cross-Check

| HTML File | PRD Screen | Status | Notes |
|-----------|------------|--------|-------|
| login.html | Login Screen | Matched | - |
| signup.html | Sign Up Screen | Matched | - |
| dashboard.html | Admin Dashboard | Matched | - |
| extra-page.html | - | Extra Screen | Not in PRD |
| - | Settings Screen | HTML Pending | Missing HTML |

---

## Example Frontend Pages to API Mapping

### Auth Pages

| HTML File | Route | Frontend | API Endpoints | Status |
|-----------|-------|----------|---------------|--------|
| login.html | /login | frontend | POST /api/v1/auth/login | ⬜ |

### Admin Dashboard Pages

| HTML File | Route | Frontend | API Endpoints | Role Access | Status |
|-----------|-------|----------|---------------|-------------|--------|
| admin-dashboard.html | /admin/dashboard | dashboard | GET /api/v1/admin/stats | admin | ⬜ |
