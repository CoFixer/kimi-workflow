---
name: review
description: Code review workflow for StorePilot. Use when reviewing PRs, auditing code quality, or checking compliance with project patterns and NestJS/React best practices.
---

# Code Review Workflow

## Checklist

### Backend (NestJS)

- [ ] Uses repository pattern, not raw TypeORM in controllers
- [ ] DTOs have class-validator decorators
- [ ] Controller uses TransformInterceptor response shape
- [ ] Error handling follows ERROR-HANDLING-GUIDE.md
- [ ] No raw queries without parameterization
- [ ] Tests cover happy path and edge cases

### Frontend (React)

- [ ] Uses TanStack Query for server state
- [ ] Components are small and focused
- [ ] Tailwind classes follow design system
- [ ] Routes use React Router 7 patterns
- [ ] No prop drilling — use context or composition

### General

- [ ] No console.log or debug code left in
- [ ] i18n strings use translation keys
- [ ] No secrets or hardcoded credentials
- [ ] Commit messages follow conventional commits
