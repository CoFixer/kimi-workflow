---
description: Generate agent monitoring reports (daily summary, error analysis, team health, delegation chains)
argument-hint: "<report-type>"
---

# Agent Report

Generate monitoring reports for the agent orchestration system.

## Usage

```
/agent-report <report-type>
```

## Report Types

| Type | Description |
|------|-------------|
| `daily` | Daily summary of all agent activity (last 24h) |
| `errors` | Error pattern analysis (last 7 days) |
| `health` | Team health assessment and load distribution |
| `chains` | Delegation chain analysis and efficiency |
| `full` | All reports combined |

## Workflow

1. Parse the report type from arguments (default: `daily`)
2. Invoke the `agent-monitor` agent with the appropriate prompt:

```
Task(
  subagent_type='agent-monitor',
  description='Generate [report-type] monitoring report',
  prompt='Generate a [report-type] report by reading data from:
    - .kimi/monitoring/logs/*.jsonl (raw activity logs)
    - .kimi/monitoring/AGENT_MONITOR_DASHBOARD.md (current dashboard)
    - .kimi/monitoring/AGENT_ERROR_LOG.md (error patterns)
    - .kimi/agents/agent-registry.json (agent definitions and teams)

    Report type: [report-type]
    Output the report as formatted markdown.'
)
```

3. Display the report output to the user

## Examples

```
/agent-report daily      # What happened today?
/agent-report errors     # What's been failing?
/agent-report health     # How are teams doing?
/agent-report chains     # Are delegation patterns efficient?
/agent-report full       # Everything
```

## Data Sources

- `.kimi/monitoring/logs/*.jsonl` - JSONL activity logs per session
- `.kimi/monitoring/AGENT_MONITOR_DASHBOARD.md` - Auto-updated dashboard
- `.kimi/monitoring/AGENT_ACTIVITY_HISTORY.md` - Rolling 7-day summary
- `.kimi/monitoring/AGENT_ERROR_LOG.md` - Error pattern tracking
- `.kimi/agents/agent-registry.json` - Agent team structure and roles
