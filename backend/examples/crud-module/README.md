# CRUD Module Example

Complete example of a NestJS CRUD module following StorePilot patterns.

## Files

- `product.entity.ts` — TypeORM entity
- `product.repository.ts` — Custom repository
- `product.service.ts` — Business logic
- `product.controller.ts` — Routes and Swagger
- `create-product.dto.ts` — Create validation
- `update-product.dto.ts` — Update validation
- `product-response.dto.ts` — Response shape
- `product.module.ts` — Module wiring

## Usage

Use this as a template when creating new modules:

1. Copy the structure
2. Rename `Product` to your entity name
3. Update fields and relations
4. Adjust validation rules
5. Add business logic to service
6. Register in `AppModule`

## Pattern Reference

See `.pi/backend/guides/` for detailed explanations of each pattern.
