---
name: docs
description: Documentation generation workflow for StorePilot. Use when creating or updating API docs, architecture diagrams, developer guides, or README files.
---

# Documentation Workflow

## Types

- **API docs**: OpenAPI/Swagger specs, endpoint references
- **Architecture**: System diagrams, data flow, decision records
- **Developer guides**: Setup, conventions, troubleshooting
- **User docs**: Feature explanations, FAQ

## Process

1. Read relevant code or specs
2. Write in `.pi-project/docs/` for project-level docs
3. Write in `backend/docs/` or package docs for package-level
4. Keep in sync with code — docs drift is technical debt

## Format

- Markdown with YAML frontmatter for metadata
- Mermaid for diagrams
- Code blocks with language tags
- Relative links between docs
