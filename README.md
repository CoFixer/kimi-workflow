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
│   └── settings.json            # Workspace settings
├── agents/                      # Shared agents
│   ├── agent-registry.json      # Agent registry
│   ├── development/             # Backend, frontend, mobile, API, DB agents
│   ├── analysis/                # Code review, gap analysis, architecture
│   ├── quality/                 # Quality assurance agents
│   ├── documentation/           # Doc generation agents
│   └── orchestration/           # Project coordinator
├── backend/                     # NestJS-specific workspace
│   ├── README.md
│   ├── agents/
│   │   ├── development/         # Backend developer, module scaffolder
│   │   ├── debugging/           # Auth route debugger
│   │   ├── testing/             # Auth route tester
│   │   └── optimization/        # Cache manager
│   ├── examples/
│   │   └── crud-module/         # Complete CRUD module example
│   └── guides/                  # Backend development guides
├── frontend/                    # React-specific workspace
│   ├── README.md
│   ├── agents/
│   │   ├── development/         # Frontend developer, error fixer
│   │   └── design-qa/           # Design QA agent
│   ├── docs/
│   │   └── AUTHENTICATION.md    # Frontend auth patterns
│   ├── examples/
│   │   └── complete-examples.md
│   └── guides/                  # Frontend development guides
├── mobile/                      # React Native-specific workspace
│   ├── README.md
│   ├── agents/
│   │   └── development/         # Mobile developer, error fixer
│   ├── docs/
│   │   ├── AUTHENTICATION.md    # Mobile auth patterns
│   │   └── BEST_PRACTICES.md    # Mobile best practices
│   ├── examples/
│   │   └── complete-examples.md
│   └── guides/                  # Mobile development guides
├── skills/                      # Project-level skills
│   ├── commit/                  # Git commit & PR workflow
│   ├── feature/                 # Full-stack feature pipeline
│   ├── gap/                     # Find implementation gaps
│   ├── fix/                     # Fix implementation gaps
│   ├── review/                  # Code review checklist
│   └── docs/                    # Documentation generator
├── prompts/                     # Reusable prompt templates
│   ├── commit.md
│   ├── debug.md
│   ├── refactor.md
│   └── feature-spec.md
├── guides/                      # Quick-reference guides
│   ├── WORKFLOW-GUIDE.md
│   ├── BACKEND-PATTERNS.md
│   └── FRONTEND-PATTERNS.md
└── examples/                    # Example outputs
    └── README.md
```

## How It Works

### Skills
Skills are loaded by Kimi Code CLI from `.agents/skills/` (mirrored from `.kimi/skills/`) and invoked with `/skill:<name>`:

| Skill | Command | Purpose |
|-------|---------|---------|
| `commit` | `/skill:commit` | Git commit & PR workflow |
| `feature` | `/skill:feature` | Feature development pipeline |
| `gap` | `/skill:gap` | Find implementation gaps |
| `fix` | `/skill:fix` | Fix implementation gaps |
| `review` | `/skill:review` | Code review checklist |
| `docs` | `/skill:docs` | Documentation generation |

### Agents
Agents are specialized roles for complex tasks. Register them in `agents/agent-registry.json`:

**Development Agents:**
- `backend-developer` — NestJS specialist (`agents/development/backend-developer.md`)
- `frontend-developer` — React specialist (`agents/development/frontend-developer.md`)
- `mobile-developer` — React Native specialist (`agents/development/mobile-developer.md`)
- `api-integration-agent` — API integration specialist (`agents/development/api-integration-agent.md`)
- `database-designer` — Database schema designer (`agents/development/database-designer.md`)
- `backend-agent` — Specialized NestJS backend agent (`agents/development/backend-agent.md`)
- `frontend-agent` — Specialized React frontend agent (`agents/development/frontend-agent.md`)
- `fullstack-agent` — Full-stack coordinator (`agents/development/fullstack-agent.md`)

**Analysis Agents:**
- `code-architecture-reviewer` — Architecture review (`agents/analysis/code-architecture-reviewer.md`)
- `gap-finder` — Find gaps (`agents/analysis/gap-finder.md`)
- `gap-fixer` — Fix gaps (`agents/analysis/gap-fixer.md`)
- `duplicate-checker` — Check duplicates (`agents/analysis/duplicate-checker.md`)
- `code-reviewer` — Code review specialist (`agents/analysis/code-reviewer.md`)
- `gap-analyzer` — Gap analysis specialist (`agents/analysis/gap-analyzer.md`)

**Quality Agents:**
- `quality-lead` — Quality oversight (`agents/quality/quality-lead.md`)
- `auto-error-resolver` — Auto fix errors (`agents/quality/auto-error-resolver.md`)

**Documentation Agents:**
- `documentation-architect` — Doc architecture (`agents/documentation/documentation-architect.md`)
- `doc-updater` — Sync docs (`agents/documentation/doc-updater.md`)

**Orchestration:**
- `project-coordinator` — Multi-agent orchestration (`agents/orchestration/project-coordinator.md`)

### Prompts
Reusable prompt templates for common tasks:
- `commit` — Git commit workflow
- `debug` — Systematic debugging
- `refactor` — Safe refactoring
- `feature-spec` — Feature implementation from spec

## Usage Examples

```
/skill:commit
/skill:feature implement user profile page
/skill:review the auth module
Run the backend-agent to implement this API
Run the project-coordinator to plan this feature
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
3. Invoke with `/skill:skill-name`

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
