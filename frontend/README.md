---
name: frontend-workspace
description: React frontend workspace for StorePilot.
---

# .kimi/frontend

React-specific agents, guides, and examples for the StorePilot frontend and dashboard.

## Directory Structure

```
frontend/
├── README.md
├── agents/
│   ├── development/       # Frontend developer, error fixer
│   └── design-qa/         # Design QA agent
├── docs/
│   └── AUTHENTICATION.md  # Frontend auth patterns
├── examples/
│   └── complete-examples.md
└── guides/
    └── *.md               # Frontend development guides
```

## Agents

| Agent | Purpose |
|-------|---------|
| `frontend-developer` | React/Router/Tailwind development |
| `frontend-error-fixer` | Fix frontend errors systematically |
| `design-qa-agent` | Check design implementation quality |

## Guides

- `api-integration.md` — API hooks and data fetching
- `common-patterns.md` — Reusable patterns
- `component-patterns.md` — Component architecture
- `data-fetching.md` — TanStack Query patterns
- `file-organization.md` — Project structure
- `loading-and-error-states.md` — UX patterns
- `performance.md` — Optimization
- `routing-guide.md` — React Router 7 patterns
- `styling-guide.md` — Tailwind CSS patterns
- `tanstack-query.md` — Query/mutation patterns
- `typescript-standards.md` — TypeScript conventions

## Quick Commands

```bash
cd frontend   # or cd dashboard
npm run dev        # Development server
npm run build      # Production build
npm run typecheck  # TypeScript check
npm run test:e2e   # E2E tests
```

## Notes

- `frontend/` and `dashboard/` share the same stack
- Routing lives under `app/routes/`
- Components use Tailwind CSS v4
- Data fetching uses TanStack Query
