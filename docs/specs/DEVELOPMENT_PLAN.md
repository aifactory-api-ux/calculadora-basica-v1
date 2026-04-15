# DEVELOPMENT PLAN: Calculadora Basica v1

## 1. ARCHITECTURE OVERVIEW

**Components:**
- **Frontend (HTML5, CSS3, JS ES6+)**: Implements a minimal, intuitive calculator UI for sum and subtraction, with clear input, result display, and error handling.
- **Backend (Node.js/Express.js)**: Optional API for calculation, strictly limited to addition and subtraction, with input validation and formatted result.
- **Infrastructure**: Dockerized setup for both frontend and backend, orchestrated via docker-compose, with healthchecks and environment variable validation.

**Models & APIs (from SPEC.md):**
- **OperationRequest**: `{ operand1: number, operand2: number, operation: "add" | "subtract" }`
- **OperationResponse**: `{ result: number, formattedResult: string }`
- **ErrorResponse**: `{ error: string }`
- **API Endpoint**: `POST /api/calculate` (accepts OperationRequest, returns OperationResponse or ErrorResponse)

**Folder Structure (from SPEC.md):**
```
calculadora-basica-v1/
├── backend/
│   ├── Dockerfile
│   ├── server.js
│   ├── routes/
│   │   └── calculate.js
│   ├── validators/
│   │   └── operationValidator.js
│   ├── formatters/
│   │   └── numberFormatter.js
│   ├── .env.example
│   └── README.md
├── frontend/
│   ├── Dockerfile
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── main.js
│   │   ├── components/
│   │   │   ├── Calculator.js
│   │   │   ├── ResultDisplay.js
│   │   │   └── ErrorMessage.js
│   │   ├── hooks/
│   │   │   └── useCalculator.js
│   │   └── styles/
│   │       └── calculator.css
│   ├── .env.example
│   └── README.md
├── docker-compose.yml
├── run.sh
├── .gitignore
└── README.md
```

**Import Contracts & State Contracts:**  
All function, prop, and hook names must match those in SPEC.md exactly.

## 2. ACCEPTANCE CRITERIA

1. The user can perform addition and subtraction of integers and decimals via a web UI, with clear input, operator selection, and result display.
2. The backend API (`POST /api/calculate`) accepts only addition and subtraction, validates input, and returns correctly formatted results or user-friendly errors.
3. The frontend displays errors and results as specified, and the clear ("C") button resets the calculator state.
4. All environment variables are validated on startup; healthchecks pass for all services; the app runs end-to-end via `./run.sh` with no manual steps.
5. **Frontend UX clarification:** No explicit requirement for a UI-specialized polished visual finish is present; proceeding with a functional/basic UI as per scope. (If a premium UI is required, please clarify.)

## TEAM SCOPE (MANDATORY — PARSED BY THE PIPELINE)
- **role-tl (technical_lead)**: Foundation/shared contracts
- **role-be (backend_developer)**: Backend API, validation, formatting
- **role-fe (frontend_developer)**: Frontend UI, state, hooks, styling
- **role-devops (devops_support)**: Infrastructure, orchestration, documentation

## 3. EXECUTABLE ITEMS

---

### ITEM 1: Foundation — Data Contracts, Validation, Formatting Utilities

**Goal:**  
Establish all shared data contracts, input validation, and number formatting utilities for the backend. These are the only files imported by other backend modules.

**Files to create:**
- backend/validators/operationValidator.js (create)  
  - Exports: `validateOperationRequest(reqBody)` (per SPEC.md)
  - Validates that operand1 and operand2 are numbers, operation is "add" or "subtract"
- backend/formatters/numberFormatter.js (create)  
  - Exports: `formatNumber(num)` (per SPEC.md)
  - Formats a number to a string with two decimals (e.g., "1,234.56")

**Dependencies:** None

**Validation:**  
- Run `node` and require each module; call `validateOperationRequest` with valid/invalid payloads and `formatNumber` with sample numbers to verify correct behavior.

**Role:** role-tl (technical_lead)

---

### ITEM 2: Backend API — Calculation Endpoint & Server

**Goal:**  
Implement the backend API for calculation, including the Express server, calculation route, and Dockerfile. All logic strictly limited to addition and subtraction.

**Files to create:**
- backend/server.js (create)  
  - Express app entry point; imports `calculateHandler` from `routes/calculate.js`
  - Registers `/api/calculate` POST endpoint
  - Healthcheck endpoint `/health` (returns `{status, service, version}`)
  - Loads env vars from `.env`, validates presence of `PORT` and `ALLOWED_ORIGIN`
  - CORS setup using `ALLOWED_ORIGIN`
  - Structured logging (JSON to stdout)
- backend/routes/calculate.js (create)  
  - Exports: `calculateHandler`
  - Imports `validateOperationRequest` and `formatNumber`
  - Handles input validation, performs calculation, formats result, returns correct response per SPEC.md
- backend/Dockerfile (create)  
  - Multi-stage build, non-root user, exposes port 8080, CMD: `node server.js`
- backend/.env.example (create)  
  - Documents `PORT` and `ALLOWED_ORIGIN` as per SPEC.md
- backend/README.md (create)  
  - Usage, env vars, API contract, example requests/responses

**Dependencies:** Item 1

**Validation:**  
- `docker build` and `docker run` for backend; `curl` to `/api/calculate` and `/health` returns correct responses; invalid input returns error per contract.

**Role:** role-be (backend_developer)

---

### ITEM 3: Frontend — UI, State Hook, Components, Styling

**Goal:**  
Implement the frontend calculator UI, state management hook, result and error display components, and styling. All logic and props must match SPEC.md contracts exactly.

**Files to create:**
- frontend/public/index.html (create)  
  - Main HTML file, includes `<script src="/src/main.js"></script>`
- frontend/src/main.js (create)  
  - Entry point; renders Calculator component, wires up state hook
- frontend/src/components/Calculator.js (create)  
  - Exports: `Calculator` (default)
  - Implements calculator UI: number buttons (0-9, "."), "+" and "-" operator buttons, "=" for calculate, "C" for clear
  - Props as per SPEC.md
- frontend/src/components/ResultDisplay.js (create)  
  - Exports: `ResultDisplay` (default)
  - Displays result and formattedResult per props
- frontend/src/components/ErrorMessage.js (create)  
  - Exports: `ErrorMessage` (default)
  - Displays error message per props
- frontend/src/hooks/useCalculator.js (create)  
  - Exports: `useCalculator`
  - Manages state: operand1, operand2, operation, result, formattedResult, error, loading, setOperand1, setOperand2, setOperation, calculate, clear
  - Handles API call to `/api/calculate` using `API_BASE_URL` from env
- frontend/src/styles/calculator.css (create)  
  - Styles for calculator layout, buttons, display
- frontend/Dockerfile (create)  
  - Multi-stage build for static frontend, serves via nginx or similar, non-root user
- frontend/.env.example (create)  
  - Documents `API_BASE_URL` as per SPEC.md
- frontend/README.md (create)  
  - Usage, env vars, component contracts, example screenshots

**Dependencies:** Item 1

**Validation:**  
- `docker build` and `docker run` for frontend; UI loads, user can perform addition and subtraction, errors and results display as specified, clear button resets state.

**Role:** role-fe (frontend_developer)

---

### ITEM 4: Infrastructure & Deployment

**Goal:**  
Provide complete orchestration and documentation for local development and deployment. Ensures all services run with a single command, with healthchecks and environment variable documentation.

**Files to create:**
- docker-compose.yml (create)  
  - Defines backend and frontend services, correct build contexts, ports, healthchecks, depends_on with service_healthy
- run.sh (create)  
  - Validates Docker is running, builds and starts all services, waits for health, prints access URL
- .gitignore (create)  
  - Excludes node_modules, dist, .env, logs, etc.
- .dockerignore (create)  
  - Excludes node_modules, .git, logs, dist
- README.md (create)  
  - Project overview, setup instructions, how to run, endpoints, troubleshooting
- docs/architecture.md (create)  
  - System diagram, component descriptions, sequence diagram (from architecture doc)

**Dependencies:** Items 1, 2, 3

**Validation:**  
- `./run.sh` completes with no errors; both frontend and backend report healthy; calculator is accessible at the printed URL and works end-to-end.

**Role:** role-devops (devops_support)

---