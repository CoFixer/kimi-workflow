---
name: pipeline-status-template
description: Template for PIPELINE_STATUS.md used by /fullstack orchestrator
---

# Fullstack Pipeline Status - {PROJECT_NAME}

## Progress

| Phase | Skill | Tier | Status | Prerequisites | Output | Notes |
|-------|-------|------|--------|---------------|--------|-------|
| init | project-init.md | base | :clipboard: | - | - | - |
| prd | convert-prd-to-knowledge.md | nestjs | :clipboard: | init | - | - |
| database | database-schema-designer.md | nestjs | :clipboard: | prd | - | - |
| backend | (composite) | nestjs | :clipboard: | database | - | - |
| frontend | figma-to-react-converter.md | react | :clipboard: | prd | - | - |
| integrate | api-integration.md | react | :clipboard: | backend, frontend | - | - |
| test | e2e-test-generator.md | stack | :clipboard: | integrate | - | - |
| qa | design-qa.md | react | :clipboard: | test | - | - |
| ship | deployment.md | base | :clipboard: | qa | - | - |

## Execution Log

| Date | Phase | Duration | Result | Notes |
|------|-------|----------|--------|-------|

## Configuration

```yaml
project: {PROJECT_NAME}
created: {DATE}
last_run: null
tech_stack: nestjs+react
```

## Agent Results

### init
(null)

### prd
(null)

### database
(null)

### backend
(null)

### frontend
(null)

### integrate
(null)

### test
(null)

### qa
(null)

### ship
(null)

## Change Tracking

```yaml
submodule_hashes:
  base: null
  nestjs: null
  react: null
skill_checksums:
  init: null
  prd: null
  database: null
  backend: null
  frontend: null
  integrate: null
  test: null
  qa: null
  ship: null
doc_mtimes:
  PROJECT_KNOWLEDGE: null
  PROJECT_API: null
  PROJECT_DATABASE: null
```
