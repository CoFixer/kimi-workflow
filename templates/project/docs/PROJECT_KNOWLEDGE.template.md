# {PROJECT_NAME} — Project Knowledge

> Last updated: {DATE}

---

## Overview

[Project description from PRD]

---

### Goals

1. [Goal 1 from PRD]
2. [Goal 2 from PRD]
3. [Goal 3 from PRD]

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Backend | {BACKEND} |
| Frontend | {FRONTENDS} |
| Database | PostgreSQL |
| ORM | TypeORM (NestJS) / Django ORM |
| Auth | JWT + Refresh Tokens |
| API Docs | Swagger (NestJS) / drf-spectacular (Django) |

---

## Architecture

### Backend — {BACKEND}

```
backend/
├── src/
│   ├── modules/           # Feature modules
│   ├── common/            # Shared utilities, guards, interceptors
│   ├── config/            # Configuration files
│   └── main.ts            # Application entry
├── test/                  # E2E tests
└── package.json
```

### Frontend — React Web

```
frontend/
├── src/
│   ├── components/        # Reusable UI components
│   ├── pages/             # Route-level pages
│   ├── hooks/             # Custom React hooks
│   ├── services/          # API integration
│   └── App.tsx
└── package.json
```

### Mobile — React Native

```
mobile/
├── src/
│   ├── components/
│   ├── screens/
│   ├── navigation/
│   └── App.tsx
└── package.json
```

---

## User Types

| Role | Permissions |
|------|-------------|
| [Role from PRD] | [Permissions from PRD] |

---

## Terminology

| Term | Definition |
|------|------------|
| [Term from PRD] | [Definition from PRD] |

---

## External Services

| Service | Purpose | Documentation |
|---------|---------|---------------|
| [Service from PRD] | [Purpose from PRD] | [Link from PRD] |

---

## Key Features

- [Feature 1 from PRD]
- [Feature 2 from PRD]
- [Feature 3 from PRD]
