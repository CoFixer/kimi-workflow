---
name: kimi-workspace
description: Project-specific AI workflow system for Kimi Code CLI.
---

# .kimi Workflow

A project-specific workflow system for Kimi Code CLI, modeled after `.pi` but optimized for Kimi's capabilities.

## Directory Structure

```
.kimi/
├── README.md                    # This file
├── base/                        # Base configuration
│   ├── README.md
│   ├── settings.json            # Workspace settings
│   ├── docs/                    # Framework docs, checklists, guides
│   └── guides/                  # Base guides (OAuth, PM2, etc.)
├── agents/                      # Shared agents (35+ agents)
│   ├── agent-registry.json      # Agent registry
│   ├── development/             # Backend, frontend, mobile, API, DB agents
│   ├── analysis/                # Code review, gap analysis, architecture
│   ├── quality/                 # Quality assurance agents
│   ├── documentation/           # Doc generation agents
│   ├── orchestration/           # Project coordinator
│   └── testing/                 # Playwright QA agent
├── backend/                     # NestJS-specific workspace
│   ├── README.md
│   ├── agents/
│   │   ├── development/         # Backend developer, module scaffolder
│   │   ├── debugging/           # Auth route debugger
│   │   ├── testing/             # Auth route tester
│   │   └── optimization/        # Cache manager
│   ├── examples/
│   │   └── crud-module/         # Complete CRUD module example
│   └── guides/                  # Backend development guides (25+)
├── frontend/                    # React-specific workspace
│   ├── README.md
│   ├── agents/
│   │   ├── development/         # Frontend developer, error fixer
│   │   └── design-qa/           # Design QA agent
│   ├── docs/
│   │   └── AUTHENTICATION.md    # Frontend auth patterns
│   ├── examples/
│   │   └── complete-examples.md
│   └── guides/                  # Frontend development guides (14+)
├── mobile/                      # React Native-specific workspace
│   ├── README.md
│   ├── agents/
│   │   ├── development/         # Mobile developer, error fixer
│   │   ├── frontend-developer.md
│   │   └── frontend-error-fixer.md
│   ├── docs/
│   │   ├── AUTHENTICATION.md    # Mobile auth patterns
│   │   └── BEST_PRACTICES.md    # Mobile best practices
│   ├── examples/
│   │   └── complete-examples.md
│   └── guides/                  # Mobile development guides (12+)
├── skills/                      # Project-level skills (21 skills)
│   ├── commit/                  # Git commit & PR workflow
│   ├── create-dev-pr/           # Create PR to dev branch
│   ├── feature/                 # Full-stack feature pipeline
│   ├── gap/                     # Find implementation gaps
│   ├── fix/                     # Fix implementation gaps
│   ├── find-gaps/               # Design-to-code gap analysis
│   ├── fix-gaps/                # Fix identified gaps
│   ├── generate-docs/           # Generate API & knowledge docs
│   ├── review-tickets/          # Notion ticket review
│   ├── run-fullstack/           # Full-stack development pipeline
│   ├── crud-module-generator/   # Generate NestJS CRUD modules
│   ├── e2e-test-generator/      # Generate E2E tests
│   ├── swagger-doc-generator/   # Generate Swagger docs
│   ├── code-quality-checker/    # Check code quality
│   ├── guard-decorator-builder/ # Build NestJS guards
│   ├── response-dto-factory/    # Generate response DTOs
│   ├── run-playwright/          # Run Playwright E2E tests
│   ├── frontend-e2e-testing/    # Frontend E2E testing
│   ├── mobile-e2e-testing/      # Mobile E2E testing
│   ├── review/                  # Code review checklist
│   └── docs/                    # Documentation generator
├── prompts/                     # Reusable prompt templates (70+)
│   ├── commit.md
│   ├── debug.md
│   ├── deploy.md
│   ├── design-qa.md
│   ├── feature-spec.md
│   ├── fix-gaps.md
│   ├── fullstack.md
│   ├── gap-finder.md
│   ├── generate-crud.md
│   ├── generate-prd.md
│   ├── html-to-react.md
│   ├── new-project.md
│   ├── qa.md
│   ├── reflect.md
│   ├── refactor.md
│   ├── run-e2e.md
│   ├── setup-claude.md
│   ├── start.md
│   ├── team.md
│   ├── ui-review.md
│   └── ... and 50+ more
├── guides/                      # Quick-reference guides
│   ├── WORKFLOW-GUIDE.md
│   ├── BACKEND-PATTERNS.md
│   └── FRONTEND-PATTERNS.md
└── examples/                    # Example outputs
    └── README.md
```

## How It Works

### Skills
Skills are loaded by Kimi Code CLI and invoked with `/skill:<name>`:

| Skill | Command | Purpose |
|-------|---------|---------|
| `commit` | `/skill:commit` | Git commit & PR workflow |
| `feature` | `/skill:feature` | Feature development pipeline |
| `gap` | `/skill:gap` | Find implementation gaps |
| `fix` | `/skill:fix` | Fix implementation gaps |
| `review` | `/skill:review` | Code review checklist |
| `docs` | `/skill:docs` | Documentation generation |
| `create-dev-pr` | `/skill:create-dev-pr` | Create PR to dev with validation |
| `find-gaps` | `/skill:find-gaps` | Design-to-code gap analysis |
| `fix-gaps` | `/skill:fix-gaps` | Fix identified gaps |
| `generate-docs` | `/skill:generate-docs` | Generate API & knowledge docs |
| `review-tickets` | `/skill:review-tickets` | Review Notion tickets |
| `run-fullstack` | `/skill:run-fullstack` | Full-stack dev pipeline |
| `crud-module-generator` | `/skill:crud-module-generator` | Generate NestJS CRUD |
| `e2e-test-generator` | `/skill:e2e-test-generator` | Generate E2E tests |
| `swagger-doc-generator` | `/skill:swagger-doc-generator` | Generate Swagger docs |
| `code-quality-checker` | `/skill:code-quality-checker` | Check code quality |
| `guard-decorator-builder` | `/skill:guard-decorator-builder` | Build NestJS guards |
| `response-dto-factory` | `/skill:response-dto-factory` | Generate response DTOs |
| `run-playwright` | `/skill:run-playwright` | Run Playwright tests |
| `frontend-e2e-testing` | `/skill:frontend-e2e-testing` | Frontend E2E tests |
| `mobile-e2e-testing` | `/skill:mobile-e2e-testing` | Mobile E2E tests |

### Agents
Agents are specialized roles for complex tasks. Register them in `agents/agent-registry.json`:

**Development Agents (10):**
- `backend-developer` — NestJS specialist (`agents/development/backend-developer.md`)
- `frontend-developer` — React specialist (`agents/development/frontend-developer.md`)
- `mobile-developer` — React Native specialist (`agents/development/mobile-developer.md`)
- `api-integration-agent` — API integration specialist (`agents/development/api-integration-agent.md`)
- `database-designer` — Database schema designer (`agents/development/database-designer.md`)
- `nestjs-specialist` — Advanced NestJS patterns (`agents/development/nestjs-specialist.md`)
- `ticket-fixer` — Full-stack ticket resolver (`agents/development/ticket-fixer.md`)
- `backend-agent` — Specialized backend agent (`agents/development/backend-agent.md`)
- `frontend-agent` — Specialized frontend agent (`agents/development/frontend-agent.md`)
- `fullstack-agent` — Full-stack coordinator (`agents/development/fullstack-agent.md`)

**Analysis Agents (11):**
- `code-architecture-reviewer` — Architecture review (`agents/analysis/code-architecture-reviewer.md`)
- `code-refactor-master` — Refactoring patterns (`agents/analysis/code-refactor-master.md`)
- `gap-finder` — Find gaps (`agents/analysis/gap-finder.md`)
- `gap-fixer` — Fix gaps (`agents/analysis/gap-fixer.md`)
- `duplicate-checker` — Check duplicates (`agents/analysis/duplicate-checker.md`)
- `code-reviewer` — Code review specialist (`agents/analysis/code-reviewer.md`)
- `gap-analyzer` — Gap analysis specialist (`agents/analysis/gap-analyzer.md`)
- `automation-scout` — Detect automation opportunities (`agents/analysis/automation-scout.md`)
- `followup-suggester` — Suggest follow-ups (`agents/analysis/followup-suggester.md`)
- `learning-extractor` — Extract learnings (`agents/analysis/learning-extractor.md`)
- `plan-reviewer` — Review plans (`agents/analysis/plan-reviewer.md`)

**Quality Agents (5):**
- `quality-lead` — Quality oversight (`agents/quality/quality-lead.md`)
- `auto-error-resolver` — Auto fix errors (`agents/quality/auto-error-resolver.md`)
- `agent-monitor` — Monitor agent workflows (`agents/quality/agent-monitor.md`)
- `refactorer` — Refactoring execution (`agents/quality/refactorer.md`)
- `reviewer` — General reviewer (`agents/quality/reviewer.md`)

**Documentation Agents (4):**
- `documentation-architect` — Doc architecture (`agents/documentation/documentation-architect.md`)
- `doc-updater` — Sync docs (`agents/documentation/doc-updater.md`)
- `prd-converter` — PRD to spec (`agents/documentation/prd-converter.md`)
- `web-research-specialist` — Technical research (`agents/documentation/web-research-specialist.md`)

**Orchestration (1):**
- `project-coordinator` — Multi-agent orchestration (`agents/orchestration/project-coordinator.md`)

**Testing (1):**
- `playwright-qa-agent` — E2E test execution (`agents/testing/playwright-qa-agent.md`)

### Prompts
Reusable prompt templates for common tasks (70+ prompts):
- `commit` — Git commit workflow
- `debug` — Systematic debugging
- `deploy` — Deployment workflow
- `design-qa` — Design quality assurance
- `feature-spec` — Feature implementation from spec
- `fix-gaps` — Fix implementation gaps
- `fullstack` — Full-stack development
- `gap-finder` — Find gaps
- `generate-crud` — Generate CRUD
- `generate-prd` — Generate PRD
- `html-to-react` — Convert HTML to React
- `new-project` — New project setup
- `qa` — Quality assurance
- `reflect` — Session reflection
- `refactor` — Safe refactoring
- `run-e2e` — Run E2E tests
- `setup-claude` — Setup Claude config
- `start` — Project startup
- `team` — Team coordination
- `ui-review` — UI review
- ... and 50+ more in `prompts/`

## Usage Examples

```
/skill:commit
/skill:feature implement user profile page
/skill:review the auth module
/skill:generate-docs api
/skill:find-gaps
Run the backend-agent to implement this API
Run the project-coordinator to plan this feature
Run the playwright-qa-agent to test this flow
Use the debug prompt
```

## Creating New Skills

1. Create folder: `skills/{skill-name}/`
2. Add `SKILL.md` with frontmatter:
   ```markdown
   ---
   name: skill-name
   description: What this skill does and when to use it
   ---
   ```
3. Register in `skills/skill-rules.json`
4. Invoke with `/skill:skill-name`

## Creating New Agents

1. Create file: `agents/{category}/{agent-name}.md`
2. Add frontmatter with role and tags
3. Register in `agents/agent-registry.json`
4. Invoke with: "Run the {agent-name} to..."

## Integration with .pi

This system complements `.pi` (which targets Claude-specific patterns):
- `.pi` → Claude-specific harnesses, hooks, and advanced patterns
- `.kimi` → Kimi Code CLI optimized prompts, skills, and agents

Both share the same project conventions documented in `AGENTS.md`.
