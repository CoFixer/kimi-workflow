# {PROJECT_NAME}

> {PROJECT_NAME} — Full stack application built with {BACKEND} and {FRONTENDS}.

---

## Features

- [Feature 1 from PRD]
- [Feature 2 from PRD]
- [Feature 3 from PRD]

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Backend | {BACKEND} |
| Frontend | {FRONTENDS} |
| Database | PostgreSQL |
| Styling | TailwindCSS |
| UI Components | shadcn/ui |

---

## Quick Start

### Prerequisites

- Docker & Docker Compose
- Node.js 20+
- Git

### Setup

```bash
# Clone repo
git clone https://github.com/potentialInc/{PROJECT_NAME}.git
cd {PROJECT_NAME}

# Start all services
docker-compose up -d

# Or start individually:
# Backend
cd backend && npm install && npm run start:dev

# Frontend
cd frontend && npm install && npm run dev
```

---

## Project Structure

```
{PROJECT_NAME}/
├── backend/        # {BACKEND} API
├── frontend/       # React web app
├── dashboard/      # Admin dashboard
├── mobile/         # React Native app
├── .kimi/          # Kimi Code CLI config
├── .project/       # Project docs
└── docker-compose.yml
```

---

## Development

| Service | Command | URL |
|---------|---------|-----|
| Backend | `cd backend && npm run start:dev` | http://localhost:{BACKEND_PORT} |
| Frontend | `cd frontend && npm run dev` | http://localhost:5173 |
| Dashboard | `cd dashboard && npm run dev` | http://localhost:5174 |
| API Docs | Swagger UI | http://localhost:{BACKEND_PORT}/api/docs |

---

## Testing

```bash
# Backend tests
cd backend && npm test

# Frontend tests
cd frontend && npm test
```

---

## Deployment

```bash
# Build all services
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d
```

---

## Documentation

- [PROJECT_KNOWLEDGE.md](.project/docs/PROJECT_KNOWLEDGE.md) — Architecture & features
- [PROJECT_API.md](.project/docs/PROJECT_API.md) — API reference
- [PROJECT_DATABASE.md](.project/docs/PROJECT_DATABASE.md) — Database schema
- [AGENTS.md](AGENTS.md) — Agent development context

---

## License

Proprietary — CoFixer/StorePilot
