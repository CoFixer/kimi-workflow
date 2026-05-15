---
name: phase-result-schema
description: Compact output schema for all agents dispatched by /fullstack
---

# PHASE_RESULT Schema

All agents dispatched by the fullstack orchestrator **must** return `PHASE_RESULT` in this compact format.

## Format

```json
PHASE_RESULT: {
  "phase": "backend",
  "status": "complete | failed | partial",
  "summary": "Single sentence, max 200 chars describing what was done",
  "counts": {
    "files_created": 12,
    "endpoints_implemented": 34,
    "entities_created": 8,
    "tests_generated": 0,
    "gaps_found": 3
  },
  "top_issues": [
    "Max 3 items. Max 100 chars each. Only blockers or critical failures."
  ],
  "artifact_paths": [
    ".project/status/{tier}/API_IMPLEMENTATION_STATUS.md"
  ],
  "next_phase_hints": "Max 300 chars. Only context the IMMEDIATELY next phase strictly needs."
}
```

## Size Limit

**≤ 500 tokens total.** Use `counts` instead of lists. Store all detail in `artifact_paths`.

## Context Checkpoint

After extracting `PHASE_RESULT` from agent output:

1. Extract **only** the `PHASE_RESULT` block
2. Write compact result to `PIPELINE_STATUS.md` → `## Agent Results → {phase}`
3. **Discard** full agent output — do not reference it again
4. For subsequent phases: read prior summaries from `PIPELINE_STATUS.md` using line-range reads
5. If Execution Log exceeds 20 entries, remove oldest 10 before appending
