# PURE Home River – Property Agent Management

Full-stack take-home exercise: TypeScript/Express REST API + Vue 3 web client.

---

## Project Structure

```
pure-home-river/
├── backend/          # Express + TypeScript REST API
│   └── src/
│       ├── index.ts        # App entry point
│       ├── routes.ts       # CRUD route handlers
│       ├── store.ts        # In-memory data store
│       ├── types.ts        # Shared interfaces / DTOs
│       └── validation.ts   # Input validation middleware
├── frontend/         # Vue 3 + TypeScript client
│   └── src/
│       ├── App.vue
│       ├── main.ts
│       ├── router/         # Vue Router config
│       ├── services/       # Axios API service layer
│       ├── types/          # Shared TypeScript types
│       └── views/
│           ├── AgentList.vue   # List all agents + delete
│           └── AgentForm.vue   # Create / edit agent
└── data-model.mermaid  # ER diagram (Part 1)
```

---

## Part 1 – Data Model

See [`data-model.mermaid`](./data-model.mermaid). Rendered diagram:

**Tables & Relationships**
- `PROPERTY_AGENT` manages 0–many `PROPERTY` records
- Each `PROPERTY` can have 0–many `FAMILY` records (one family active at a time ideally enforced at app layer)
- Each `FAMILY` contains 1–many `TENANT` records
- `NOTE_REMINDER` belongs to an agent, optionally scoped to a property

---

## Part 2 – REST API

### Setup & Run

```bash
cd backend
npm install
npm run dev       # runs on http://localhost:3000
```

### Endpoints

| Method | Path                  | Description              |
|--------|-----------------------|--------------------------|
| GET    | /api/agents           | List all agents          |
| GET    | /api/agents/:id       | Get single agent         |
| POST   | /api/agents           | Create new agent         |
| PUT    | /api/agents/:id       | Update agent (partial OK)|
| DELETE | /api/agents/:id       | Delete agent             |
| GET    | /health               | Health check             |

### Example curl commands

```bash
# List all
curl http://localhost:3000/api/agents

# Get one
curl http://localhost:3000/api/agents/<id>

# Create
curl -X POST http://localhost:3000/api/agents \
  -H "Content-Type: application/json" \
  -d '{"firstName":"Alice","lastName":"Wang","email":"alice@example.com","mobileNumber":"+1-555-9999"}'

# Update
curl -X PUT http://localhost:3000/api/agents/<id> \
  -H "Content-Type: application/json" \
  -d '{"mobileNumber":"+1-555-0000"}'

# Delete
curl -X DELETE http://localhost:3000/api/agents/<id>
```

### Property Agent Schema

```json
{
  "id": "uuid",
  "firstName": "string",
  "lastName": "string",
  "email": "string (unique)",
  "mobileNumber": "string",
  "createdAt": "ISO 8601 timestamp",
  "updatedAt": "ISO 8601 timestamp"
}
```

---

## Part 3 – Vue Web Client

### Setup & Run

```bash
cd frontend
npm install
npm run dev       # runs on http://localhost:5173
```

> The Vite dev server proxies `/api` → `http://localhost:3000`, so both services must run concurrently.

**Features:**
- **List view** – Grid of all agents with avatar initials, details, edit & delete actions
- **Create form** – Inline validation, API error display, redirect on success
- **Edit form** – Pre-populated fields, partial updates, success feedback
- **Delete modal** – Confirmation dialog before deletion

---

## Stretch Goal: Email Uniqueness Constraint

**What:** The API enforces unique email addresses across all agents — both on `POST /agents` (create) and `PUT /agents/:id` (update, excluding the agent's own current email).

**Why this matters:** An agent's email is a natural business identifier used for login, notifications, and communication. Allowing duplicates would cause message routing failures and make it impossible to uniquely look up agents by contact info. This is the kind of data integrity rule that's cheapest to enforce at the API layer — before a real database is introduced — rather than retrofitting it later.

**Implementation:** `agentStore.emailExists(email, excludeId?)` scans the in-memory store and the route handler returns a `409 Conflict` with a clear error message when a duplicate is detected.

---

## Error Handling Strategy

| Layer    | Responsibility                                             |
|----------|------------------------------------------------------------|
| Backend  | Input validation (400), not found (404), duplicate (409), unhandled (500) |
| Frontend | Field-level validation before submit; API error messages surfaced in alerts; form disabled during inflight requests |

Discussion point: the frontend duplicates some validation rules (email format, phone format) intentionally for UX — it gives immediate feedback without a round-trip. The backend is the source of truth for business rules like uniqueness.
