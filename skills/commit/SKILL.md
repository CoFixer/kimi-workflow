---
name: commit
description: Git commit workflow for StorePilot. Use when staging changes, writing commit messages, creating branches, or opening pull requests. Covers conventional commits format, branch naming, and PR checklist.
---

# Git Commit Workflow

Standardized Git workflow for StorePilot commits and PRs.

## Check Changes

```bash
cd <package-dir>
git status
git diff --stat
```

## Stage & Review

Stage only related changes. Never stage `.env` files, `node_modules/`, build outputs, or temporary files.

## Commit Message Format

Follow conventional commits:

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types:** feat, fix, docs, style, refactor, perf, test, chore
**Scopes:** backend, frontend, dashboard, plugin, shared, deps

## Branch Naming

```
feature/<ticket>-short-desc
fix/<ticket>-short-desc
hotfix/critical-desc
chore/update-dependencies
```

## PR Checklist

- Tests pass (`npm test` or `npm run test:e2e`)
- Type checking passes (`npm run type-check`)
- Linting passes (`npm run lint:check`)
- Self-review completed
