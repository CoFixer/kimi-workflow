---
name: error-pattern-library
description: Common errors and fixes.
---

# Error Pattern Library

Reference only — verify actual error context before fixing.

## TypeScript

| Error | Cause | Fix |
|-------|-------|-----|
| TS2304 | Missing import/undeclared | Add import or declare |
| TS2345 | Type mismatch in argument | Cast or adjust types |
| TS2322 | Assignment mismatch | Align types or narrow |
| TS7006 | Implicit any | Add type annotation |
| TS2532 | Possibly undefined | Add `?.` or null check |

## NestJS

| Error | Cause | Fix |
|-------|-------|-----|
| Cannot resolve dependency | Missing @Injectable/module | Add decorator or import module |
| Repository not found | Entity not in TypeOrmModule | Add to forFeature([Entity]) |

## React

| Error | Cause | Fix |
|-------|-------|-----|
| Invalid hook call | Hooks outside component/conditional | Move to top level |
| Too many re-renders | setState during render | Move to useEffect |

## Build

| Error | Cause | Fix |
|-------|-------|-----|
| Module not found | Missing package/bad path | Install package or fix path |
| Cannot find module X | Missing @types | `npm install -D @types/X` |
