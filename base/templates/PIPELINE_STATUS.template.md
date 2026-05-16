---
name: pipeline-status-template
description: Template for project pipeline status tracking
---

# Pipeline Status — {PROJECT_NAME}

## Progress

| Phase | Agent | Status | Prerequisites | Output |
|-------|-------|--------|---------------|--------|
| init | project-coordinator | ⬜ | - | - |
| prd | prd-converter | ⬜ | init | PROJECT_KNOWLEDGE.md |
| database | database-designer | ⬜ | prd | Schema + migrations |
| backend | backend-developer | ⬜ | database | API endpoints |
| frontend | frontend-developer | ⬜ | prd | UI components |
| integrate | api-integration-developer | ⬜ | backend, frontend | Hooks + types |
| test | test-engineer | ⬜ | integrate | Tests |
| review | code-reviewer | ⬜ | test | Review report |

## Execution Log

| Date | Phase | Duration | Result |
|------|-------|----------|--------|

## Configuration

```yaml
project: {PROJECT_NAME}
created: {DATE}
tech_stack: nestjs+react
```
