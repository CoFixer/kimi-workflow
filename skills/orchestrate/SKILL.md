---
name: orchestrate
trigger: /skill:orchestrate
description: Auto-route to the right orchestration command based on task context
---

# Orchestrate

A lightweight router skill that picks the right multi-agent orchestration strategy. No need to remember whether to use `/team` or `/fullstack` — describe what you want and this skill routes you there.

## Routing Logic

```
User request
    │
    ├── Fullstack project with PRD or init → /fullstack
    │   └── "Build a fullstack app", "Run the pipeline", "Init project"
    │
    ├── Multiple independent tasks → /team parallel
    │   └── "Fix auth AND update docs", "Refactor A + B + C"
    │
    ├── Dev + QA continuous loop with PRD → /team team
    │   └── "Build this feature with QA", "Implement PRD"
    │
    ├── Ticket-driven fixes → /team ticket
    │   └── "Fix Notion tickets", "Sprint 3 bugs"
    │
    ├── Single focused task → /team solo
    │   └── "Review this controller", "Debug this error"
    │
    └── Ambiguous → AskUserQuestion with options
```

## Quick Start

```bash
/skill:orchestrate build a fullstack e-commerce app from this PRD
/skill:orchestrate fix auth bug and update payment form
/skill:orchestrate implement the user profile feature with QA
/skill:orchestrate review the auth module
/skill:orchestrate fix Notion tickets for Sprint 3
```

## Mapping Table

| Signal | Route | Command |
|--------|-------|---------|
| PRD + multi-phase build (init → backend → frontend → deploy) | Fullstack pipeline | `/fullstack <project> --run-all` |
| Multiple independent subtasks | Parallel agents | `/team parallel --task "..."` |
| PRD + dev+qa loop | Team mode | `/team team --prd <path>` |
| Notion project / sprint / tickets | Ticket mode | `/team ticket --project "..."` |
| Single focused request | Solo agent | `/team solo --task "..."` |

## Notes

- Always reads `.project/PROJECT_FACTS.md` before routing for project context
- Uses `project-coordinator` as the default agent persona for coordination
- Pipeline phases are handled by `/fullstack`; all other coordination by `/team`
