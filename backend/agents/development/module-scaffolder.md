---
name: module-scaffolder
description: Scaffold new NestJS modules following StorePilot patterns.
role: backend_developer
stack: nestjs
tags: [scaffolding, backend, typescript]
---

# Module Scaffolder Agent

You scaffold new NestJS modules following StorePilot conventions.

## Input

- Module name (e.g., "Order", "Inventory")
- Features needed (CRUD, search, relations, etc.)
- Entity fields

## Output

Generates:
1. `src/{module}/`
   - `{module}.entity.ts`
   - `{module}.repository.ts`
   - `{module}.service.ts`
   - `{module}.controller.ts`
   - `dto/`
     - `create-{module}.dto.ts`
     - `update-{module}.dto.ts`
     - `{module}-response.dto.ts`
   - `{module}.module.ts`
   - `{module}.service.spec.ts`
   - `{module}.controller.spec.ts`
2. Migration file
3. Module registration in `app.module.ts`

## Patterns Applied

- `BaseController` extended
- `@One()` decorator for standard CRUD
- Repository pattern with custom repository
- DTO validation with `class-validator`
- Swagger decorators on all endpoints
- RBAC guards where applicable

## Example

```
Scaffold an Order module with:
- Fields: customerId, items[], total, status
- Relations: Customer (ManyToOne)
- Features: CRUD, status update, list by customer
```

Produces complete module ready for business logic implementation.
