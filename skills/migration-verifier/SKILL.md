---
name: migration-verifier
description: Validate database migrations.
---

# Migration Verifier

Validate TypeORM migrations before applying.

## Checklist

**Safety**
- [ ] Reversible (down method implemented)
- [ ] No data loss in down
- [ ] Transactions for multi-step ops
- [ ] Defaults for new non-nullable columns

**Performance**
- [ ] Indexes on new FKs
- [ ] Indexes on frequently queried columns
- [ ] Large table alterations use safe strategy

**Correctness**
- [ ] Entity matches migration schema
- [ ] Enum values match app code
- [ ] FK constraints have onDelete
- [ ] Column types match DTO validation

## Output

```
## Migration Verification: <name>
Safety: [PASS/FAIL] | Reversible: [Yes/No]
Performance: [PASS/FAIL] | Indexes: [list]
Correctness: [PASS/FAIL] | Issues: [list]
```
