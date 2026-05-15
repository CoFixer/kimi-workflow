---
name: new-project
description: Create a complete new project with .kimi config, boilerplate code, and .project documentation. Use when initializing a new StorePilot/Cofixer project from scratch or adding documentation to an existing project.
---

# New Project Setup Workflow

## Prerequisites

- Empty or near-empty directory
- Git initialized
- `gh` CLI authenticated (for GitHub repo creation)

## Modes

| Flag | Behavior |
|------|----------|
| (none) | Full setup — boilerplate + docs |
| `--docs-only` | Documentation only for existing project |
| `--compress` | Lightweight templates (smaller AGENTS.md/README.md) |

## Steps

1. **Parse arguments** — extract `$PROJECT_NAME`, detect flags
2. **Detect & migrate resources** — move `HTML/` → `.project/resources/HTML/`, `prd.pdf` → `.project/prd/`
3. **Gather tech stack** — backend (NestJS/Django), frontends (React, React Native), dashboards
4. **Clone boilerplates** — backend/, frontend/, mobile/, dashboard/ from starter-kit repos
5. **Sync env ports** — run `.kimi/base/scripts/sync-env-ports.js`
6. **Generate docker-compose.yml** — based on selected services
7. **Create .project documentation** — copy templates, replace placeholders, populate from PRD
8. **Create AGENTS.md** — consolidated context file in root
9. **Create README.md** — project README with stack info
10. **Git commit & push** — initial commit, create GitHub repo

## Templates Used

- `.kimi/templates/project/*` → `.project/`
- `.kimi/templates/AGENTS.template.md` → `AGENTS.md`
- `.kimi/templates/README.template.md` → `README.md`

## Placeholders Replaced

- `{PROJECT_NAME}` — lowercase project name
- `{BACKEND}` — nestjs / django
- `{FRONTENDS}` — comma-separated list
- `{DATE}` — YYYY-MM-DD

## Next Steps After Setup

1. `cd $PROJECT_NAME`
2. `docker-compose up -d`
3. Begin development
