# {PROJECT_NAME} — Database Schema

> Last updated: {DATE}

---

## Entity Relationship Diagram

```
┌─────────────┐       ┌─────────────┐       ┌─────────────┐
│   users     │       │  [entity]   │       │  [entity2]  │
├─────────────┤       ├─────────────┤       ├─────────────┤
│ PK id       │◄──────┤ FK user_id  │       │ PK id       │
│ email       │  1:N  │ ...         │       │ ...         │
│ role        │       │ created_at  │       │ created_at  │
│ created_at  │       │ updated_at  │       │ updated_at  │
└─────────────┘       └─────────────┘       └─────────────┘
```

---

## Entity Relationships

| Relationship | Cardinality | Description |
|--------------|-------------|-------------|
| users → [entity] | 1:N | One user has many [entities] |
| [entity] → [entity2] | N:1 | Many [entities] belong to one [entity2] |

---

## Tables

### users

| Column | Type | Nullable | Default | Description |
|--------|------|----------|---------|-------------|
| id | uuid | No | gen_random_uuid() | Primary key |
| email | varchar(255) | No | - | Unique email |
| password | varchar(255) | No | - | Hashed password |
| role | enum | No | 'user' | user, admin, etc. |
| is_active | boolean | No | true | Account status |
| created_at | timestamp | No | now() | Creation time |
| updated_at | timestamp | No | now() | Last update |

**Constraints:**
- UNIQUE (email)

---

### [entity_name_from_PRD]

| Column | Type | Nullable | Default | Description |
|--------|------|----------|---------|-------------|
| id | uuid | No | gen_random_uuid() | Primary key |
| [column] | [type] | [Yes/No] | [default] | [description from PRD] |
| created_at | timestamp | No | now() | Creation time |
| updated_at | timestamp | No | now() | Last update |

**Constraints:**
- FOREIGN KEY [column] REFERENCES [table](id) ON DELETE [CASCADE/SET NULL]

---

## Indexes

| Table | Columns | Type | Purpose |
|-------|---------|------|---------|
| users | email | UNIQUE | Fast lookup |
| users | role, is_active | BTREE | Filter queries |
