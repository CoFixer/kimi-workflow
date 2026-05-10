# Frontend Guides

Guides for React frontend and dashboard development.

## Available Guides

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

## Quick Reference

### Project Structure
```
app/
├── routes/          # Route components
├── components/      # Reusable components
├── hooks/           # Custom hooks
├── lib/             # Utilities
├── types/           # TypeScript types
└── styles/          # Global styles
```

### Key Technologies
- React 19
- React Router 7
- Tailwind CSS 4
- TanStack Query
- Zustand (state)
- react-hook-form + zod (forms)

## Notes

- `frontend/` and `dashboard/` are separate apps
- Both use the same stack
- Routing lives under `app/routes/`
- Server rendering with React Router 7
