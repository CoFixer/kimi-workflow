# Agent-to-Framework Automatic Resource Mapping System

Comprehensive guide for the agent type classification and framework resource auto-injection system.

---

## Overview

This system automatically provides agents with framework-specific resources (guides, skills, agents, commands) based on their type. When a typed agent is invoked, it receives context from its assigned framework repositories.

**Benefits:**
- Agents automatically access relevant framework patterns and best practices
- No manual resource lookups needed
- Consistent resource discovery across all agents
- Easy to extend with new frameworks and agent types

---

## Agent Type Classification

### Agent Types

| Type | Purpose | Frameworks | When to Use |
|------|---------|------------|-------------|
| **backend** | Backend API development | nestjs | Building APIs, services, database logic |
| **frontend** | Web frontend development | react | Building web UI components, pages, routing |
| **mobile** | Mobile app development | react-native | Building mobile apps with React Native |
| **cross-stack** | Full-stack development | nestjs, react | Working across backend and frontend |
| **generic** | Framework-agnostic | none | Code review, refactoring, documentation, research |

### Current Agent Mappings

#### Backend Agents
- **backend-developer** → nestjs
  - NestJS four-layer architecture
  - TypeORM

- **database-designer** → nestjs
  - TypeORM entity design
  - Database migrations

#### Frontend Agents
- **frontend-developer** → react
  - React 19 patterns
  - TailwindCSS styling
  - React Router v7

#### Mobile Agents
- **mobile-developer** → react-native
  - React Native components
  - NativeWind styling
  - React Navigation

#### Cross-Stack Agents
- **ticket-fixer** → nestjs + react
  - Full-stack ticket resolution
  - Both backend and frontend patterns

#### Generic Agents (No Framework Context)
- reviewer
- auto-error-resolver
- refactorer
- documentation-architect
- web-research-specialist
- prd-converter

---

## Framework Resource Discovery

### What Gets Discovered

For each framework assigned to an agent type, the system discovers:

**1. Guides** (`.kimi/{framework}/guides/`)
- Comprehensive patterns and best practices
- Architecture overviews
- Step-by-step tutorials
- Examples: `AUTHENTICATION-GUIDE.md`, `ROUTING-AND-CONTROLLERS-GUIDE.md`, `DATABASE-PATTERNS-GUIDE.md`

**2. Skills** (`.kimi/skills/`)
- Specialized framework-agnostic and framework-specific skills
- Task automation
- Examples: `crud-module-generator`, `swagger-doc-generator`, `e2e-test-generator`

**3. Agents** (`.kimi/{framework}/agents/`)
- Framework-specific subagents
- Deep expertise agents
- Examples: `auth-route-debugger`, `module-scaffolder`

**4. Examples** (`.kimi/{framework}/examples/`)
- Copy-paste code templates
- Examples: `crud-module/`

### Discovery Process

```
1. Agent is invoked (e.g., backend-developer)
2. System loads agent-registry.json
3. Resolves frameworks for agent type (backend → nestjs)
4. Scans each framework directory for resources
5. Builds formatted context string (top 5 guides only to save tokens)
6. Prepends context to agent's system prompt
```

---

## Context Injection Format

When an agent receives framework context, it's formatted like this:

```markdown
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🎯 FRAMEWORK RESOURCES AVAILABLE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Assigned Frameworks: nestjs

📚 NESTJS RESOURCES (28 guides, showing top 5):
  → AUTHENTICATION-GUIDE.md - JWT guards and decorators
  → DATABASE-PATTERNS-GUIDE.md - TypeORM setup and patterns
  → ROUTING-AND-CONTROLLERS-GUIDE.md - Route handling and decorators
  → SERVICES-AND-REPOSITORIES-GUIDE.md - Service patterns and data access
  → RESPONSE-LAYOUT-GUIDE.md - Standard response wrappers
  (+ 23 more guides)

Agents (.kimi/backend/agents/):
  → auth-route-debugger - Authentication debugging
  → module-scaffolder - NestJS module scaffolding

Examples (.kimi/backend/examples/):
  → crud-module/ - Complete CRUD module template

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
IMPORTANT: Use these resources when implementing features.
Reference guides for patterns, invoke skills for specialized tasks.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

**Token budget:** Framework context is capped at ~500 tokens per framework.

---

## Configuration

### agent-registry.json

Central registry at `.kimi/agents/agent-registry.json`:

```json
{
  "version": "2.0",
  "agents": {
    "development": {
      "backend-developer": {
        "name": "Backend Developer",
        "stack": "nestjs",
        "file": "development/backend-developer.md",
        "tags": ["backend", "nestjs", "api", "typeorm"]
      },
      "frontend-developer": {
        "name": "Frontend Developer",
        "stack": "react",
        "file": "development/frontend-developer.md",
        "tags": ["frontend", "react", "ui", "tailwind"]
      }
    }
  }
}
```

### Agent Frontmatter

Each agent markdown file includes metadata:

```yaml
---
name: backend-developer
description: NestJS backend specialist...
role: backend_developer
---
```

The `stack` field is resolved from `agent-registry.json`, not frontmatter.

---

## How Agents Use Framework Resources

### 1. Reference Guides for Patterns

When implementing features, agents reference framework guides:

```typescript
// Agent reads .kimi/backend/guides/ROUTING-AND-CONTROLLERS-GUIDE.md
// Then implements following the patterns:
@Controller('users')
export class UsersController extends BaseController<UsersService> {
  constructor(protected readonly service: UsersService) {
    super(service);
  }
}
```

### 2. Invoke Skills for Specialized Tasks

Agents can invoke skills via the skill trigger patterns:

```
Backend-developer implementing new module:
1. Reads .kimi/backend/guides/ARCHITECTURE-OVERVIEW-GUIDE.md
2. Invokes crud-module-generator skill to create entities
3. Implements service layer following guide patterns
4. Invokes swagger-doc-generator skill to create Swagger docs
```

### 3. Delegate to Framework Agents

Agents can call framework-specific subagents using the Agent tool:

```
Backend-developer encounters auth issue:
→ Delegates to .kimi/backend/agents/debugging/auth-route-debugger
→ Auth debugger uses NestJS-specific knowledge to fix
```

---

## Executable Orchestration

Instead of relying on prompt-based orchestration, use the **dispatcher script**:

```bash
# Initialize a pipeline
node .kimi/scripts/dispatcher.js init my-project --backend nestjs --frontend react

# Check status
node .kimi/scripts/dispatcher.js status my-project

# See next phase
node .kimi/scripts/dispatcher.js next my-project

# Run a phase (builds agent prompt, updates pipeline.json)
node .kimi/scripts/dispatcher.js run my-project --phase backend

# Complete a phase with validated PHASE_RESULT
node .kimi/scripts/dispatcher.js complete my-project --phase backend --result result.json

# Validate any PHASE_RESULT file
node .kimi/scripts/dispatcher.js validate-phase-result result.json
```

The dispatcher:
- Reads/writes `.project/status/{project}/pipeline.json` (structured)
- Syncs to `.project/status/{project}/PIPELINE_STATUS.md` (human-readable)
- Validates PHASE_RESULT against `.kimi/base/schemas/phase-result.json`
- Builds agent prompts with framework context injection
- Tracks execution history (max 20 entries)

---

## Adding New Agents

### Step 1: Create Agent Markdown File

Create `.kimi/agents/your-agent.md`:

```markdown
---
name: your-agent
description: ...
role: backend_developer
---

# Your Agent

## Framework Resources Available

This agent automatically receives context from:
- **NestJS**: .kimi/backend/guides/

Refer to these resources when implementing features.

## Core Responsibilities
...
```

### Step 2: Register in agent-registry.json

Add to `.kimi/agents/agent-registry.json`:

```json
{
  "agents": {
    "development": {
      "your-agent": {
        "name": "Your Agent",
        "stack": "nestjs",
        "file": "development/your-agent.md",
        "tags": ["backend", "custom"]
      }
    }
  }
}
```

---

## Adding New Frameworks

### Step 1: Create Framework Directory

```
.kimi/yourframework/
├── guides/
│   ├── architecture-overview.md
│   ├── routing.md
│   └── ...
├── agents/
│   └── framework-expert.md
└── examples/
    └── starter-template/
```

### Step 2: Update Agent Registry

Add agents that use the new framework:

```json
{
  "agents": {
    "development": {
      "your-agent": {
        "stack": "yourframework",
        "file": "development/your-agent.md"
      }
    }
  }
}
```

No additional configuration needed — the dispatcher discovers resources automatically.

---

## Implementation Details

### Dispatcher Script

Located at `.kimi/scripts/dispatcher.js`:

**Key Functions:**
- `loadPipeline(project)` — Reads pipeline.json
- `findNextPhase(pipeline)` — Finds first pending phase with met prerequisites
- `buildAgentPrompt(project, phase, pipeline)` — Builds dispatch prompt with framework context
- `validatePhaseResult(data)` — Validates against phase-result.json schema
- `syncMarkdown(project, pipeline)` — Keeps PIPELINE_STATUS.md in sync

### Resource Discovery

The dispatcher performs lazy resource discovery:
- Only scans framework directories when an agent is dispatched
- Caches framework listings in memory for the session
- Limits guide listings to top 5 + count to stay within token budgets

---

## Troubleshooting

### Agent Not Receiving Framework Context

**Symptoms:** Agent doesn't reference framework guides or patterns

**Solutions:**
1. Check agent is in `agent-registry.json` with correct `stack`
2. Verify framework directory exists in `.kimi/` (e.g., `.kimi/backend/guides/`)
3. Ensure dispatcher script can read the directory

### Framework Not Discovered

**Symptoms:** Context shows no resources from a framework

**Solutions:**
1. Check framework directory exists: `.kimi/backend/guides/`, `.kimi/frontend/guides/`, etc.
2. Verify framework has correct structure:
   ```
   backend/
   ├── guides/
   ├── agents/
   └── examples/
   ```
3. Check file permissions (must be readable)

### Context Injection Too Large

**Symptoms:** "Prompt is too long" errors

**Solutions:**
1. The dispatcher already caps guide listings at top 5
2. Reduce guide file sizes
3. Use `artifact_paths` in PHASE_RESULT to store detail externally

---

## Best Practices

### For Agent Creators

1. **Choose the Right Stack**
   - Use `backend` for API/database work
   - Use `frontend` for UI components
   - Use `mobile` for React Native
   - Use `generic` for framework-agnostic tasks

2. **Document Framework Usage**
   - Add "Framework Resources Available" section
   - Reference specific guides in agent instructions
   - Show examples of using framework patterns

3. **Use the Dispatcher**
   - Don't manually copy-paste agent prompts
   - Use `node dispatcher.js run ...` to generate prompts
   - Validate PHASE_RESULT before marking complete

### For Framework Maintainers

1. **Organize Resources Clearly**
   - Group guides by topic
   - Name files descriptively
   - Add descriptions in frontmatter

2. **Keep Guides Updated**
   - Update for new framework versions
   - Add new patterns as they emerge
   - Remove deprecated patterns

3. **Document Skills Thoroughly**
   - Clear skill descriptions
   - Examples of when to use
   - Integration with guides

---

## Examples

### Example 1: Backend Agent Using Framework Context

```markdown
User: "Create a new Products API endpoint"

System invokes: backend-developer
Framework context injected: nestjs guides

Agent process:
1. Reads .kimi/backend/guides/ROUTING-AND-CONTROLLERS-GUIDE.md
2. Follows four-layer architecture pattern
3. Creates:
   - products.entity.ts (Entity layer)
   - products.repository.ts (Repository layer)
   - products.service.ts (Service layer)
   - products.controller.ts (Controller layer)
   - DTOs for request/response
4. Generates migration
5. Adds Swagger documentation
```

### Example 2: Frontend Agent Using Framework Context

```markdown
User: "Convert this HTML landing page to React"

System invokes: frontend-developer
Framework context injected: react guides

Agent process:
1. Reads .kimi/frontend/guides/component-patterns.md
2. Analyzes HTML structure
3. Creates React components:
   - LandingPage.tsx (main page)
   - Hero.tsx (hero section)
   - Features.tsx (features section)
4. Applies TailwindCSS from .kimi/frontend/guides/styling-guide.md
5. Sets up routing with React Router v7
```

---

## Performance Considerations

### Resource Discovery Caching

- Framework resources are discovered once per session
- Cached in memory for subsequent agent invocations
- Reduces filesystem operations

### Context Size Management

- Shows up to 5 guides per framework
- Lists agent and example counts (not full paths)
- Keeps framework context under ~500 tokens per framework

### Lazy Loading

- Resources only discovered for invoked agents
- Generic agents skip framework discovery entirely
- Frameworks loaded on-demand, not at startup

---

## Future Enhancements

### Planned Features

1. **Dynamic Framework Selection**
   - Agents request additional frameworks mid-execution
   - User can override frameworks for specific tasks

2. **Skill Auto-Invocation**
   - Agents automatically invoke relevant skills
   - Smart suggestions based on task context

3. **Framework Versioning**
   - Track framework guide versions
   - Include version in context
   - Handle breaking changes

4. **Resource Filtering**
   - Filter guides by relevance to current task
   - Show only applicable skills
   - Prioritize frequently used resources

---

## Related Documentation

- [agent-registry.json](../../agents/agent-registry.json) - Complete agent catalog
- [dispatcher.js](../../scripts/dispatcher.js) - Executable orchestration
- [pipeline.json schema](../schemas/pipeline.json) - Structured status schema
- [phase-result.json schema](../schemas/phase-result.json) - PHASE_RESULT contract
- [PROJECT_KNOWLEDGE.md](../../../../.project/docs/PROJECT_KNOWLEDGE.md) - Project-specific patterns

---

## Support

For issues or questions:
1. Check this guide's [Troubleshooting](#troubleshooting) section
2. Review [agent-registry.json](../../agents/agent-registry.json) configuration
3. Verify framework directories exist in `.kimi/`
4. Test dispatcher: `node .kimi/scripts/dispatcher.js status <project>`
