---
name: backend-workspace
description: NestJS backend workspace for StorePilot.
---

# .kimi/backend

NestJS-specific agents, guides, and examples for the StorePilot backend.

## Directory Structure

```
backend/
├── README.md
├── agents/
│   ├── development/       # Backend developer, module scaffolder
│   ├── debugging/         # Auth route debugger
│   ├── testing/           # Auth route tester
│   └── optimization/      # Cache manager
├── examples/
│   └── crud-module/       # Complete CRUD module example
└── guides/
    └── *.md               # Backend development guides
```

## Agents

| Agent | Purpose |
|-------|---------|
| `backend-developer` | General NestJS development |
| `module-scaffolder` | Scaffold new modules |
| `auth-route-debugger` | Debug auth routing issues |
| `auth-route-tester` | Test auth routes systematically |
| `cache-manager` | Redis caching optimization |

## Guides

- `DATABASE-PATTERNS.md` — TypeORM and migration patterns
- `ERROR-HANDLING.md` — Exception filters and error responses
- `ROUTING-AND-CONTROLLERS.md` — Controller and route patterns
- `SERVICES-AND-REPOSITORIES.md` — Service layer architecture
- `TESTING.md` — Unit and E2E testing
- `VALIDATION.md` — DTO validation patterns
- `WORKFLOWS/` — Development workflows (PRD→Knowledge, DB Design, etc.)

## Examples

### CRUD Module

Complete example of a NestJS CRUD module:
- `product.entity.ts` — TypeORM entity
- `product.repository.ts` — Custom repository
- `product.service.ts` — Business logic
- `product.controller.ts` — Routes and Swagger
- `create-product.dto.ts` / `update-product.dto.ts` — Validation DTOs
- `product-response.dto.ts` — Response shapes
- `product.module.ts` — Module wiring

## Quick Commands

```bash
cd backend
npm run start:dev      # Development server
npm run build          # Production build
npm run type-check     # TypeScript check
npm test               # Unit tests
npm run test:e2e       # E2E tests
npm run migration:run  # Run migrations
```
