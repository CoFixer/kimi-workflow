# Backend Guides

Guides for NestJS backend development.

## Available Guides

- `DATABASE-PATTERNS.md` — TypeORM and migration patterns
- `ERROR-HANDLING.md` — Exception filters and error responses
- `ROUTING-AND-CONTROLLERS.md` — Controller and route patterns
- `SERVICES-AND-REPOSITORIES.md` — Service layer architecture
- `TESTING.md` — Unit and E2E testing
- `VALIDATION.md` — DTO validation patterns
- `WORKFLOWS/` — Development workflows

## Quick Reference

### Project Structure
```
src/
├── modules/         # Feature modules
├── common/          # Shared utilities
├── config/          # Configuration
├── database/        # Migrations
└── main.ts          # Entry point
```

### Key Technologies
- NestJS
- TypeORM
- PostgreSQL
- Redis
- BullMQ
- Passport/JWT

## Patterns

See `../examples/crud-module/` for a complete CRUD module example.

See `.pi/backend/guides/` for detailed pattern documentation.
