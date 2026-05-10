---
name: fix
description: Gap fixing workflow for StorePilot. Use when addressing gaps found by gap analysis, bug reports, or code review. Covers root cause analysis, minimal fix, and verification.
---

# Gap Fixing Workflow

## Process

1. **Understand**: Re-read the gap report or bug description
2. **Locate**: Find the exact files and lines to change
3. **Analyze**: Determine root cause
4. **Fix**: Make minimal, targeted changes
5. **Verify**: Run tests and type checks

## Principles

- Smallest change that fixes the issue
- Follow existing patterns in the codebase
- Add tests if gap is testable
- Update docs if behavior changes

## Verification Checklist

- [ ] Relevant tests pass
- [ ] Type check passes
- [ ] Lint passes
- [ ] Manual verification (if needed)
