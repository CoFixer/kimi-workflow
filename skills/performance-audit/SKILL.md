---
name: performance-audit
description: Performance audit for backend and frontend.
---

# Performance Audit

Identify bottlenecks.

## Backend

- [ ] No N+1 queries (eager load or DataLoader)
- [ ] Indexes on FKs and search fields
- [ ] Pagination on list endpoints
- [ ] Heavy ops use BullMQ queues
- [ ] Response times < 200ms

## Frontend

- [ ] No unnecessary re-renders
- [ ] Large lists virtualized/paginated
- [ ] Images optimized and lazy-loaded
- [ ] Route-based code splitting
- [ ] Bundle < 200KB initial

## Network
- [ ] API calls batched
- [ ] TanStack Query caching
- [ ] No duplicate requests on mount

## Output

```
## Performance Audit: <scope>
Backend: Critical N | Warnings N
Frontend: Critical N | Warnings N
Recommendations:
1. <highest impact>
2. <second highest>
```
