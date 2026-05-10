---
name: gap
description: Gap analysis workflow for StorePilot. Use when comparing implemented code against PRD, design docs, or API specs to find missing functionality, edge cases, or incomplete patterns.
---

# Gap Analysis Workflow

## Process

1. **Read spec**: Load PRD, design doc, or API spec
2. **Read implementation**: Load relevant source files
3. **Compare**: Map spec requirements to code
4. **Report**: List gaps with file references and severity

## Severity Levels

- **Critical**: Missing core functionality, blocks release
- **High**: Important feature incomplete, affects UX
- **Medium**: Missing validation, edge case not handled
- **Low**: Missing docs, minor inconsistency

## Output Format

```
## Gap: <brief description>
- **File**: `path/to/file.ts`
- **Spec**: `path/to/spec.md` section X
- **Severity**: Critical/High/Medium/Low
- **Details**: What's missing and why it matters
```
