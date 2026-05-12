# Agent & Team Monitoring Guide

How to monitor individual agents and agent teams while they work in Kimi Code CLI.

---

## Table of Contents

- [Quick Reference](#quick-reference)
- [Monitoring Individual Agents](#monitoring-individual-agents)
- [Monitoring Agent Teams](#monitoring-agent-teams)
- [Task List Monitoring](#task-list-monitoring)
- [Dispatcher Monitoring](#dispatcher-monitoring)
- [Troubleshooting](#troubleshooting)

---

## Quick Reference

### Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| **Ctrl+T** | Toggle task list display |
| **Ctrl+B** | Move running task to background |

### Slash Commands

| Command | What It Does |
|---------|-------------|
| `/task` | List all background tasks with IDs and status |

---

## Monitoring Individual Agents

### Background vs Foreground

**Foreground agents** (default):
- Block the main conversation until complete
- You see all tool uses and outputs in real-time
- Permission prompts pass through to you

**Background agents** (`run_in_background: true`):
- Run concurrently while you keep working
- Permissions are pre-approved before launch
- Returns a **task ID** and **output file path**

### Running Agents in Background

Ask Kimi to run something in the background:
```
Run the test suite in the background and report only failing tests
```

Or use the Shell tool with `run_in_background=true`.

### Checking Background Agent Progress

**Non-blocking check** (returns immediately with whatever output is available):
Use `TaskOutput` tool with `block=false`.

**Blocking wait** (waits for agent to finish):
Use `TaskOutput` tool with `block=true`.

**Read the output file directly:**
Use the ReadFile tool on the output file path, or `tail` via Shell to see recent output.

### Listing Background Tasks

Use the `TaskList` tool to enumerate active background tasks.

### Resuming Failed Background Agents

If a background agent fails due to missing permissions, resume it in the foreground:
```
Resume the code-reviewer subagent with the necessary permissions
```

Resumed agents retain their full conversation history and pick up exactly where they stopped.

---

## Monitoring Agent Teams

Agent teams have a **lead** (your main session) and multiple **teammates** (separate subagent instances invoked via the `Agent` tool).

### How Team Mode Works in Kimi

Unlike Claude Code's `TeamCreate`/`SendMessage` tools, Kimi Code CLI uses the **`Agent` tool** for subagent dispatch:

```
Lead (you) → Agent tool → Subagent instance
                ↓
         Subagent works with its own context
                ↓
         Returns result to lead
```

Key differences from Claude Code:
- No `TeamCreate` — use multiple `Agent` calls
- No `SendMessage` — subagents return results directly
- No `TodoWrite` — use `SetTodoList` tool instead
- No persistent team sessions — each `Agent` call is independent

### Example: Spawning and Monitoring a Team

```
Create an agent team to review PR #142. Spawn three reviewers:
- One focused on security implications
- One checking performance impact
- One validating test coverage
Have them each review and report findings.
```

Implementation via Agent tool:
1. First `Agent` call with `subagent_type="explore"` for security review
2. Second `Agent` call with `subagent_type="explore"` for performance review
3. Third `Agent` call with `subagent_type="explore"` for test coverage review
4. Collect all three results in the main context

### Monitoring Parallel Agents

Since Kimi doesn't have `Shift+Up/Down` teammate cycling:
- Launch parallel agents with `run_in_background=true`
- Use `TaskList` to check which are still running
- Use `TaskOutput` to check progress on each
- Subagent conversations are stored in the session log

---

## Task List Monitoring

Teams use a shared task list to coordinate work.

### Using SetTodoList

Use the `SetTodoList` tool to create and update tasks:

```
SetTodoList with:
- Task 1: Design database schema (In progress)
- Task 2: Implement backend API (Pending)
- Task 3: Build frontend UI (Pending)
- Task 4: Run QA checks (Pending)
```

### Task States

| State | Meaning |
|-------|---------|
| **Pending** | Awaiting assignment |
| **In progress** | Currently being worked on |
| **Done** | Finished |

### Managing Tasks

```
Update the todo list: mark database schema as done, backend API as in_progress
Show me the current todo list
```

---

## Dispatcher Monitoring

When using the executable dispatcher (`node .kimi/scripts/dispatcher.js`):

### Check Pipeline Status

```bash
node .kimi/scripts/dispatcher.js status my-project
```

Shows:
- Phase statuses (pending, in_progress, complete, failed)
- Assigned agents
- Outputs and notes
- Next eligible phase

### Monitor Phase Execution

```bash
# See what's next
node .kimi/scripts/dispatcher.js next my-project

# Run a phase (generates dispatch prompt)
node .kimi/scripts/dispatcher.js run my-project --phase backend

# After agent finishes, complete the phase
node .kimi/scripts/dispatcher.js complete my-project --phase backend --result result.json
```

### Pipeline Status Files

| File | Purpose |
|------|---------|
| `.project/status/{project}/pipeline.json` | Structured status (machine-readable) |
| `.project/status/{project}/PIPELINE_STATUS.md` | Human-readable markdown table |
| `.project/status/{project}/{phase}-dispatch-prompt.md` | Generated agent prompt |

---

## Verbose Output & Debugging

| Command / Shortcut | Purpose |
|--------------------|---------|
| **Ctrl+O** | Toggle verbose output - shows all tool calls and decisions |
| `/task` | Background task status |

### Subagent Context

Subagent conversations are part of the main session. To understand what an agent did:
1. Review the subagent's returned output
2. Check files the agent created/modified
3. Use `TaskOutput` for background agents

---

## Troubleshooting

### Agents Not Appearing

- Check if background tasks are still running with `TaskList`
- For foreground agents, the conversation output appears inline
- Subagent results are returned in the main conversation

### Too Many Permission Prompts

Pre-approve common operations when launching agents:
- Background agents launched with `run_in_background=true` have permissions pre-approved
- Foreground agents will prompt for each tool use

### Task Status Appears Stuck

Update manually with `SetTodoList`:
```
Update todo list: mark "backend API" as done
```

### Dispatcher Errors

```bash
# Pipeline file not found
node .kimi/scripts/dispatcher.js init my-project --backend nestjs --frontend react

# Phase prerequisites not met
node .kimi/scripts/dispatcher.js status my-project
# Check which prerequisites are incomplete

# PHASE_RESULT validation failed
node .kimi/scripts/dispatcher.js validate-phase-result result.json
# Fix the JSON and retry
```

---

## Practical Workflow

1. **Start pipeline** with dispatcher
2. **Use `SetTodoList`** to keep the task list visible
3. **Launch agents** via `Agent` tool with `run_in_background=true` for parallel work
4. **Check `TaskList`** periodically for background agent status
5. **Use dispatcher** to track phase completion and validate results
6. **Review `pipeline.json`** for overall project health
