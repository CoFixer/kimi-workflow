---
name: feature
description: Feature development workflow for StorePilot. Use when implementing new features across backend (NestJS), frontend (React), or dashboard. Covers planning, implementation, testing, and documentation.
---

# Feature Development Workflow

## Planning

1. Read relevant `.pi-project/docs/` and `.kimi/guides/`
2. Check existing patterns in the target package
3. Identify files to create or modify

## Implementation Order

1. **Backend**: Entity → DTO → Service → Controller → Module → Tests
2. **Frontend**: API types → Hooks → Components → Routes → Tests
3. **Dashboard**: Same as frontend, respecting admin patterns

## Testing

- Unit tests for services and hooks
- E2E tests for critical flows
- Type check before committing

## Documentation

- Update `.pi-project/docs/` if schema or API changes
- Update inline code docs for public methods
