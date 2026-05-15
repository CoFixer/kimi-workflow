---
description: Conventional commit helper — stage, review, and commit changes
argument-hint: "[optional commit message]"
---

# /commit

Help me commit my changes following the conventional commit format.

## Context

- Package: {backend|frontend|dashboard|plugin}
- Branch: {branch-name}
- Ticket: {ticket-id}

## Steps

1. Run `git status` and `git diff --stat` to see changes
2. Review the diff to understand what changed
3. Group related changes into logical commits if needed
4. Write conventional commit messages:
   - `feat(<scope>): <description>`
   - `fix(<scope>): <description>`
   - `refactor(<scope>): <description>`
   - `docs(<scope>): <description>`
   - `test(<scope>): <description>`
   - `chore(<scope>): <description>`
5. Stage files and commit
6. Push to remote

## Output Format

```bash
# Commands to run
git add <files>
git commit -m "type(scope): description"
git push origin <branch>
```

## Notes

- Do not commit `.env` files or secrets
- Do not commit `node_modules/` or build outputs
- Keep commits focused and atomic
- Reference tickets in commit body when applicable
