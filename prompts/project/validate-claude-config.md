---
description: Validate .claude configuration structure and fix issues
argument-hint: Optional --fix to auto-fix common issues, --verbose for detailed output
---


# /validate-claude-config

You are a Claude Code configuration validator. Your task is to check that the `.kimi` directory follows the 3-tier system and all files are properly organized.

## The 3-Tier System

```
Tier 3 (Shared Base): .kimi/base/       - Generic commands, agents, skills, hooks
Tier 2 (Framework):   .kimi/<tech>/     - Framework-specific (nestjs, react, etc.)
Tier 1 (Project):     .kimi/            - Project-specific config + symlinks
```

**Key principles:**
- Commands live in `.kimi/prompts/` subdirectories (dev/, git/, project/, design/, qa/, agent/, utils/)
- Agents are in `.kimi/agents/` and framework-specific agent directories
- Skills are in `.kimi/skills/{skill-name}/SKILL.md`
- Hooks are configured in `settings.json` with `.kimi` paths

---

## Step 1: Check Submodule Initialization

```bash
cd .claude && git submodule status --recursive && cd ..
```

**Expected output:**
- Each line should start with a commit hash (e.g., ` abc1234 base`)
- Lines starting with `-` indicate uninitialized submodules
- Lines starting with `+` indicate submodule is at different commit than recorded

**If issues found and `--fix` requested:**
```bash
git submodule update --init --recursive
```

---

## Step 2: Check .gitmodules Configuration

```bash
cat .kimi/.gitmodules
```

**Expected content:**
- Should define `base` submodule pointing to `claude-base` repo
- May include `nestjs`, `react`, or other framework submodules
- URLs should use `https://github.com/` format

**Verify URLs match actual remotes:**
```bash
cd .kimi/base && git remote -v && cd ../..
```

**If URL mismatch and `--fix` requested:**
```bash
cd .claude && git submodule sync --recursive && cd ..
```

---

## Step 3: Check Prompts Directory

```bash
ls -la .kimi/prompts/
```

**Expected output:**
```
dev/  git/  project/  design/  qa/  agent/  utils/  README.md
```

**Verify prompts exist:**
```bash
ls .kimi/prompts/dev/*.md | head -5
ls .kimi/prompts/git/*.md | head -5
```

**If missing and `--fix` requested:**
Report that prompts directory is incomplete — may need to re-clone or update the .kimi submodule.

---

## Step 4: Validate settings.json

```bash
cat .kimi/settings.json | python3 -c "import sys,json; json.load(sys.stdin); print('Valid JSON')"
```

**Check hook paths exist:**
```bash
# Extract hook paths and verify they exist
# Hooks should use .kimi variable
cat .kimi/settings.json
```

**Verify each hook file exists and is executable:**
```bash
ls -la .kimi/base/hooks/*.sh
ls -la .project/hooks/*.sh 2>/dev/null || echo "No project hooks"
```

**Expected:**
- All `.sh` files should have execute permission (`-rwxr-xr-x`)
- Hook paths in settings.json should reference existing files

**If not executable and `--fix` requested:**
```bash
chmod +x .kimi/base/hooks/*.sh
chmod +x .project/hooks/*.sh 2>/dev/null
```

---

## Step 5: Validate skill-rules.json

```bash
cat .kimi/skills/skill-rules.json | python3 -c "import sys,json; json.load(sys.stdin); print('Valid JSON')"
```

**Check regex patterns compile:**
```bash
python3 << 'EOF'
import json
import re
import sys

with open('.kimi/skills/skill-rules.json') as f:
    rules = json.load(f)

errors = []
for skill_name, skill in rules.get('skills', {}).items():
    patterns = skill.get('promptTriggers', {}).get('intentPatterns', [])
    for pattern in patterns:
        try:
            re.compile(pattern)
        except re.error as e:
            errors.append(f"  - {skill_name}: Invalid regex '{pattern}': {e}")

if errors:
    print("Invalid regex patterns found:")
    print('\n'.join(errors))
    sys.exit(1)
else:
    print("All regex patterns are valid")
EOF
```

---

## Step 6: Check Directory Structure

**Required directories at project level (.kimi/):**
```bash
for dir in agents skills hooks; do
  if [ -d ".kimi/$dir" ]; then
    echo "OK: .kimi/$dir exists"
  else
    echo "MISSING: .kimi/$dir"
  fi
done
```

**Required directories in base tier (.kimi/base/):**
```bash
for dir in commands agents skills hooks templates; do
  if [ -d ".kimi/base/$dir" ]; then
    echo "OK: .kimi/base/$dir exists"
  else
    echo "MISSING: .kimi/base/$dir"
  fi
done
```

**Check framework tiers (if present):**
```bash
for framework in nestjs react; do
  if [ -d ".kimi/$framework" ]; then
    echo "=== .kimi/$framework ==="
    for dir in agents skills guides hooks; do
      if [ -d ".kimi/$framework/$dir" ]; then
        echo "  OK: $dir"
      else
        echo "  MISSING: $dir"
      fi
    done
  fi
done
```

---

## Step 7: Check File Permissions

**All shell scripts should be executable:**
```bash
find .claude -name "*.sh" -type f ! -perm -u+x 2>/dev/null | while read f; do
  echo "NOT EXECUTABLE: $f"
done
```

**All markdown files should be readable:**
```bash
find .claude -name "*.md" -type f ! -perm -u+r 2>/dev/null | while read f; do
  echo "NOT READABLE: $f"
done
```

**If issues found and `--fix` requested:**
```bash
find .claude -name "*.sh" -type f -exec chmod +x {} \;
find .claude -name "*.md" -type f -exec chmod +r {} \;
```

---

## Step 8: Cross-Reference Check

**List all commands available:**
```bash
echo "=== Available Commands ==="
find .kimi/prompts -name "*.md" -type f 2>/dev/null | grep -v README.md | xargs -I{} basename {} .md | sort
```

**List all agents at each tier:**
```bash
echo "=== Project Agents ==="
ls .kimi/agents/*.md 2>/dev/null | xargs -I{} basename {} .md | sort

echo "=== Base Agents ==="
ls .kimi/base/agents/*.md 2>/dev/null | xargs -I{} basename {} .md | sort

echo "=== Agents Directory ==="
ls .kimi/agents/*.md 2>/dev/null | xargs -I{} basename {} .md | sort

for framework in nestjs react; do
  if [ -d ".kimi/$framework/agents" ]; then
    echo "=== $framework Agents ==="
    ls .kimi/$framework/agents/*.md 2>/dev/null | xargs -I{} basename {} .md | sort
  fi
done
```

**Check for duplicate agents (same name at multiple tiers):**
```bash
echo "=== Checking for Duplicates ==="
(ls .kimi/agents/*.md 2>/dev/null; ls .kimi/base/agents/*.md 2>/dev/null; ls .kimi/backend/agents/**/*.md 2>/dev/null; ls .kimi/frontend/agents/**/*.md 2>/dev/null) | xargs -I{} basename {} .md | sort | uniq -d
```

---

## Step 9: Generate Health Report

After running all checks, generate a summary report:

```
=== Claude Configuration Health Report ===

Submodules:
  [ ] base: initialized, on main
  [ ] nestjs: initialized, on main
  [ ] react: initialized, on main

Prompts:
  [ ] .kimi/prompts/dev/
  [ ] .kimi/prompts/git/
  [ ] .kimi/prompts/project/
  [ ] .kimi/prompts/design/
  [ ] .kimi/prompts/qa/
  [ ] .kimi/prompts/agent/
  [ ] .kimi/prompts/utils/

Settings:
  [ ] settings.json is valid JSON
  [ ] All hook paths exist
  [ ] All hooks are executable

Skills:
  [ ] skill-rules.json is valid JSON
  [ ] All regex patterns compile

Directories:
  [ ] .kimi/agents
  [ ] .kimi/skills
  [ ] .kimi/hooks
  [ ] .kimi/prompts
  [ ] .kimi/base/templates

Permissions:
  [ ] All .sh files executable
  [ ] All .md files readable

Overall: OK / ISSUES FOUND
```

Use checkmarks for passing checks:
- `[x]` = Pass
- `[ ]` = Fail
- `[~]` = Warning (optional item missing)

---

## Auto-Fix Mode

If `$ARGUMENTS` contains `--fix`, attempt these automatic fixes:

| Issue | Fix Command |
|-------|-------------|
| Uninitialized submodules | `git submodule update --init --recursive` |
| URL mismatch | `git submodule sync --recursive` |
| Missing prompts directory | Re-clone or update .kimi submodule |
| Scripts not executable | `chmod +x .kimi/**/*.sh` |
| Detached HEAD in submodule | `cd submodule && git checkout main` |

**Note:** Auto-fix will NOT:
- Commit uncommitted changes (use `/commit` for that)
- Create missing directories (report only)
- Modify settings.json structure

---

## Verbose Mode

If `$ARGUMENTS` contains `--verbose`, include additional details:
- List all files in each directory
- Show git status for each submodule
- Display full hook configuration
- Show skill-rules.json content

---

## Common Issues and Solutions

| Issue | Symptom | Solution |
|-------|---------|----------|
| Commands not found | `/command` fails | Check prompts: `ls -la .kimi/prompts/` |
| Hook not running | No skill suggestions | Verify settings.json hook paths |
| Submodule empty | Directory exists but empty | `git submodule update --init --recursive` |
| Permission denied | Hook fails to execute | `chmod +x .kimi/**/*.sh` |
| Invalid skill-rules | JSON parse error | Check for trailing commas, missing quotes |
| Wrong branch | Features missing | `cd .kimi/base && git checkout main` |
