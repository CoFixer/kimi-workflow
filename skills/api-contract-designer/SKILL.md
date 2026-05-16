---
name: api-contract-designer
description: Design API contracts before implementation.
---

# API Contract Designer

Design DTOs and endpoints before coding. Read `.project/PROJECT_FACTS.md` first.

## Process

1. List all operations (CRUD + custom)
2. Design request DTOs with validation rules
3. Design response DTOs with examples
4. Map to HTTP methods/paths
5. Document error responses
6. Generate frontend TypeScript interfaces

## DTO Rules

- class-validator decorators for all fields
- `@ApiProperty` with examples for Swagger
- `PartialType` for update DTOs
- No sensitive fields in responses
- Enums for constrained strings

## Verification

- [ ] All operations have endpoints
- [ ] DTOs have validation
- [ ] Swagger examples provided
- [ ] Error responses documented
- [ ] Frontend types generated
