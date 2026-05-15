# Example: Database Schema Format

## Entity Relationship Diagram

```
┌─────────────────┐         ┌─────────────────┐         ┌─────────────────┐
│     users       │         │    orders       │         │   products      │
├─────────────────┤         ├─────────────────┤         ├─────────────────┤
│ PK id (uuid)    │◄───────│ FK user_id (uuid)         │ PK id (uuid)    │
│ email (varchar) │   1:N   │ FK product_id (uuid) ─────┤►│ name (varchar)  │
│ role (enum)     │         │ quantity (int)  │         │ price (decimal) │
│ created_at      │         │ status (enum)   │         │ created_at      │
│ updated_at      │         │ created_at      │         │ updated_at      │
└─────────────────┘         │ updated_at      │         └─────────────────┘
                            └─────────────────┘
```

## Entity Relationships

| Relationship | Cardinality | Description |
|--------------|-------------|-------------|
| users → orders | 1:N | One user has many orders |
| products → orders | 1:N | One product appears in many orders |

## Table Definitions

### users

| Column | Type | Nullable | Default | Description |
|--------|------|----------|---------|-------------|
| id | uuid | No | gen_random_uuid() | Primary key |
| email | varchar(255) | No | - | Unique email |
| password | varchar(255) | No | - | Hashed password |
| role | enum | No | 'user' | user, admin |
| created_at | timestamp | No | now() | Creation time |
| updated_at | timestamp | No | now() | Last update |

**Constraints:**
- UNIQUE (email)

### orders

| Column | Type | Nullable | Default | Description |
|--------|------|----------|---------|-------------|
| id | uuid | No | gen_random_uuid() | Primary key |
| user_id | uuid | No | - | FK → users.id |
| product_id | uuid | No | - | FK → products.id |
| quantity | int | No | 1 | Item quantity |
| status | enum | No | 'pending' | pending, completed, cancelled |
| created_at | timestamp | No | now() | Creation time |
| updated_at | timestamp | No | now() | Last update |

**Constraints:**
- FOREIGN KEY user_id REFERENCES users(id) ON DELETE CASCADE
- FOREIGN KEY product_id REFERENCES products(id) ON DELETE RESTRICT

### products

| Column | Type | Nullable | Default | Description |
|--------|------|----------|---------|-------------|
| id | uuid | No | gen_random_uuid() | Primary key |
| name | varchar(255) | No | - | Product name |
| price | decimal(10,2) | No | 0.00 | Product price |
| created_at | timestamp | No | now() | Creation time |
| updated_at | timestamp | No | now() | Last update |
