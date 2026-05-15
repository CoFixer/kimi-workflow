# {PROJECT_NAME} — Agent Context

> Project: {PROJECT_NAME} | Stack: {BACKEND} + {FRONTENDS} | Updated: {DATE}

---

## Quick Stack Reference

| Layer | Tech | Port |
|-------|------|------|
| Backend | {BACKEND} | {BACKEND_PORT} |
| Frontend | React | 5173 |
| Dashboard | React | 5174 |
| Mobile | React Native | Metro 8081 |
| Database | PostgreSQL | 5432 |

---

## Project Structure

```
{PROJECT_NAME}/
├── backend/              # {BACKEND} API
├── frontend/             # React web app
├── dashboard/            # Admin/ops dashboard
├── mobile/               # React Native app
├── .kimi/                # Kimi Code CLI config
├── .project/             # Project docs & status
│   ├── docs/
│   ├── memory/
│   ├── plans/
│   ├── prd/
│   ├── resources/
│   └── status/
├── docker-compose.yml
├── AGENTS.md             # This file
└── README.md
```

---

## Essential Commands

```bash
# Start all services
docker-compose up -d

# Start backend only
cd backend && npm run start:dev

# Start frontend only
cd frontend && npm run dev

# Run tests
cd backend && npm test
cd frontend && npm test
```

---

## Architecture Patterns

### Backend — {BACKEND}

- Modular architecture
- DTO validation
- JWT auth guards
- Swagger documentation
- Repository pattern

### Frontend — React

- Functional components + hooks
- TanStack Query for data fetching
- shadcn/ui + TailwindCSS
- React Router v6

### Mobile — React Native

- NativeWind for styling
- React Navigation
- Shared API layer with web

---

## Conventions

- **Commits**: Conventional commits (`feat:`, `fix:`, `docs:`, `refactor:`)
- **Branches**: `main` (production), `dev` (active), `feature/*`, `fix/*`
- **Code style**: ESLint + Prettier (enforced)
- **API responses**: `{ success, data, message }` or `{ success, error }`

---

## Key Documentation

| File | Purpose |
|------|---------|
| `.project/docs/PROJECT_KNOWLEDGE.md` | Architecture, features, tech stack |
| `.project/docs/PROJECT_API.md` | API endpoints |
| `.project/docs/PROJECT_DATABASE.md` | DB schema & ERD |
| `.project/docs/PROJECT_API_INTEGRATION.md` | Screen-to-API mapping |

---

## Kimi Skills

| Command | Purpose |
|---------|---------|
| `/skill:feature` | Implement a new feature |
| `/skill:commit` | Git commit workflow |
| `/skill:gap` | Find implementation gaps |
| `/skill:fix` | Fix gaps or bugs |
| `/skill:review` | Code review checklist |
| `/skill:docs` | Generate/update docs |
