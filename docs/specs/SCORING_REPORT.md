# SCORING REPORT

---

## 1. RESULTADO GLOBAL

| Item | Declared Files | Present | Missing | Critical Bugs | Score |
|------|---------------|---------|---------|---------------|-------|
| 1. Foundation — Data Contracts, Validation, Formatting Utilities | 6 | 6 | 0 | 0 | 100 |
| 2. Backend API — Calculation Endpoint & Server                | 7 | 7 | 0 | 0 | 100 |
| 3. Frontend — UI, State Hook, Components, Styling             | 10 | 10 | 0 | 2 | 80  |
| 4. Infrastructure & Deployment                               | 6 | 6 | 0 | 1 | 85  |

**Weighted Total Score:** **91/100**

---

## 2. SCORING POR ITEM

### ITEM 1: Foundation — Data Contracts, Validation, Formatting Utilities

**Declared Files:**
- backend/validators/operationValidator.js
- backend/formatters/numberFormatter.js
- backend/shared/dataContracts.js
- backend/shared/formatNumber.js
- backend/shared/validation.js
- backend/shared/__tests__/*

| File | Status | Notes |
|------|--------|-------|
| backend/validators/operationValidator.js | ✅ Exists | Exports `validateOperationRequest` as required. |
| backend/formatters/numberFormatter.js    | ✅ Exists | Exports `formatNumber` as required. |
| backend/shared/dataContracts.js          | ✅ Exists | Data contracts and contract validators present. |
| backend/shared/formatNumber.js           | ✅ Exists | Implements number formatting as required. |
| backend/shared/validation.js             | ✅ Exists | Implements validation as required. |
| backend/shared/__tests__/...             | ✅ Exists | Unit tests for contracts, formatting, validation. |

**Score:** **100**  
**Justification:** All files present, correct exports, no content bugs.

---

### ITEM 2: Backend API — Calculation Endpoint & Server

**Declared Files:**
- backend/server.js
- backend/routes/calculate.js
- backend/Dockerfile
- backend/.env.example
- backend/README.md

| File | Status | Notes |
|------|--------|-------|
| backend/server.js | ✅ Exists | Loads env vars, validates, CORS, healthcheck, registers `/api/calculate`. |
| backend/routes/calculate.js | ✅ Exists | Exports `calculateHandler`, imports correct modules, uses validation and formatting. |
| backend/Dockerfile | ✅ Exists | Installs dependencies, exposes port, runs server. |
| backend/.env.example | ✅ Exists | Documents `PORT` and `ALLOWED_ORIGIN`. |
| backend/README.md | ✅ Exists | Usage, env vars, API contract, examples. |

**Score:** **100**  
**Justification:** All files present, correct content, no critical bugs.

---

### ITEM 3: Frontend — UI, State Hook, Components, Styling

**Declared Files:**
- frontend/public/index.html
- frontend/src/main.js
- frontend/src/components/Calculator.js
- frontend/src/components/ResultDisplay.js
- frontend/src/components/ErrorMessage.js
- frontend/src/hooks/useCalculator.js
- frontend/src/styles/calculator.css
- frontend/Dockerfile
- frontend/.env.example
- frontend/README.md

| File | Status | Notes |
|------|--------|-------|
| frontend/public/index.html | ✅ Exists | Loads `/src/main.js` as required. |
| frontend/src/main.js | ⚠️ Exists with problems | Only logs to console; does **not** mount Calculator component or app to DOM. |
| frontend/src/components/Calculator.js | ✅ Exists | Exports default, implements UI, uses custom hook. |
| frontend/src/components/ResultDisplay.js | ✅ Exists | Exports default, displays result. |
| frontend/src/components/ErrorMessage.js | ✅ Exists | Exports default, displays error. |
| frontend/src/hooks/useCalculator.js | ⚠️ Exists with problems | Exports `useCalculator`, but **does not** return the state/handlers as per contract; instead, exposes a singleton with `subscribe`, `getState`, etc. Not compatible with the contract in SPEC.md. |
| frontend/src/styles/calculator.css | ✅ Exists | Styles present. |
| frontend/Dockerfile | ✅ Exists | Multi-stage, runs build, serves with nginx. |
| frontend/.env.example | ⚠️ Exists with problems | Uses `VITE_API_URL` instead of `API_BASE_URL` as required by SPEC.md. |
| frontend/README.md | ✅ Exists | Usage, env vars, component contracts, screenshots. |

**Score:** **80**  
**Justification:**  
- **frontend/src/main.js** does not mount the Calculator component or render the app, so the UI will not appear.
- **frontend/src/hooks/useCalculator.js** does not match the contract: it exposes a singleton with `subscribe`/`getState` instead of returning a state object with fields and handlers as per SPEC.md.
- **frontend/.env.example** uses the wrong env var name (`VITE_API_URL` instead of `API_BASE_URL`).
- Each of these is a critical bug for frontend functionality.

---

### ITEM 4: Infrastructure & Deployment

**Declared Files:**
- docker-compose.yml
- run.sh
- .gitignore
- .dockerignore
- README.md
- docs/architecture.md

| File | Status | Notes |
|------|--------|-------|
| docker-compose.yml | ✅ Exists | Defines backend/frontend, healthchecks, env vars. |
| run.sh | ✅ Exists | Validates env, builds, waits for health, prints URLs. |
| .gitignore | ✅ Exists | Excludes node_modules, dist, .env, etc. |
| .dockerignore | ⚠️ Exists with problems | **Missing from FILE TREE**. |
| README.md | ✅ Exists | Project overview, setup, endpoints, troubleshooting. |
| docs/architecture.md | ✅ Exists | System diagram, component descriptions. |

**Score:** **85**  
**Justification:**  
- **.dockerignore** is missing (not in FILE TREE), which can cause large/unnecessary files to be copied into Docker build context, slowing builds and risking secrets in images.

---

## 3. PROBLEMAS CRÍTICOS BLOQUEANTES

| # | Problem | File:Line | Impact | Item |
|---|---------|-----------|--------|------|
| 1 | App is not rendered to DOM; Calculator component is not mounted | frontend/src/main.js:1-5 | Frontend UI will not appear; app is unusable | 3 |
| 2 | `useCalculator` does not return state object as per contract; exposes singleton with subscribe/getState | frontend/src/hooks/useCalculator.js:1-140 | Frontend components cannot use the hook as per contract; breaks integration and testability | 3 |
| 3 | Env var name mismatch: uses `VITE_API_URL` instead of `API_BASE_URL` | frontend/.env.example:4 | Frontend will not pick up correct backend URL; API calls may fail | 3 |
| 4 | Missing `.dockerignore` | .dockerignore | Docker images may be bloated, secrets or node_modules may be copied into images | 4 |

---

## 4. VERIFICACIÓN DE ACCEPTANCE CRITERIA

| Acceptance Criteria | Status | Explanation |
|---------------------|--------|-------------|
| 1. User can perform addition and subtraction via web UI, with clear input, operator selection, and result display | ❌ Fail | Frontend does not mount Calculator component; UI will not appear. |
| 2. Backend API (`POST /api/calculate`) accepts only add/subtract, validates input, returns formatted results or errors | ✅ Pass | Backend implements correct validation, formatting, and error handling. |
| 3. Frontend displays errors/results as specified, clear ("C") button resets state | ⚠️ Partial | Components exist, but due to broken hook and missing mount, UI is not functional. |
| 4. All env vars validated on startup; healthchecks pass; app runs via `./run.sh` with no manual steps | ⚠️ Partial | Backend env validation is present; run.sh validates env; but frontend env var name mismatch may cause API to fail. |
| 5. Frontend UX: functional/basic UI is sufficient | ⚠️ Partial | UI code is present and styled, but not rendered due to missing mount. |

---

## 5. ARCHIVOS FALTANTES

| File | Criticality |
|------|-------------|
| .dockerignore | 🔴 CRÍTICO |

---

## 6. RECOMENDACIONES DE ACCIÓN

### 🔴 CRÍTICO

1. **Mount the Calculator component in the frontend app**
   - **File:** `frontend/src/main.js`
   - **Fix:** Replace placeholder code with code that mounts the Calculator component to the DOM, e.g.:
     ```js
     import Calculator from './components/Calculator.js';
     document.getElementById('app').appendChild(Calculator());
     ```
2. **Fix `useCalculator` hook to match contract**
   - **File:** `frontend/src/hooks/useCalculator.js`
   - **Fix:** Refactor to export a function that returns an object with the fields and handlers as per SPEC.md:
     ```js
     export function useCalculator() {
       // ...state...
       return {
         operand1,
         operand2,
         operation,
         result,
         formattedResult,
         error,
         loading,
         setOperand1,
         setOperand2,
         setOperation,
         calculate,
         clear
       };
     }
     ```
   - Remove singleton pattern and `subscribe`/`getState` if not required by contract.
3. **Fix frontend env var name**
   - **File:** `frontend/.env.example`, `frontend/src/hooks/useCalculator.js`
   - **Fix:** Use `API_BASE_URL` as the env var name everywhere. In Vite, this means:
     - In `.env.example`:
       ```
       API_BASE_URL=http://localhost:8080
       ```
     - In code:
       ```js
       const API_BASE_URL = import.meta.env.API_BASE_URL || 'http://localhost:8080';
       ```
   - Remove `VITE_API_URL` references.
4. **Add `.dockerignore` file**
   - **File:** `.dockerignore`
   - **Fix:** Create `.dockerignore` at project root with at least:
     ```
     node_modules
     dist
     .git
     logs
     *.log
     ```

### 🟠 ALTO

- Review all frontend imports and ensure all modules are imported using correct relative paths and file extensions.
- Ensure all frontend components use the state hook as per contract, passing/receiving props as specified.

### 🟡 MEDIO

- Add more robust error handling in frontend for network failures.
- Add unit tests for frontend validation logic.

### 🟢 BAJO

- Add screenshots to frontend/README.md.
- Add CI workflow for linting and tests.

---

## MACHINE_READABLE_ISSUES
```json
[
  {
    "severity": "critical",
    "files": ["frontend/src/main.js"],
    "description": "Calculator component is not mounted; frontend app does not render UI.",
    "fix_hint": "Replace placeholder code with code that mounts Calculator to #app, e.g. import Calculator from './components/Calculator.js'; document.getElementById('app').appendChild(Calculator());"
  },
  {
    "severity": "critical",
    "files": ["frontend/src/hooks/useCalculator.js"],
    "description": "useCalculator does not return state object as per contract; exposes singleton with subscribe/getState.",
    "fix_hint": "Refactor useCalculator to return an object with operand1, operand2, operation, result, formattedResult, error, loading, setOperand1, setOperand2, setOperation, calculate, clear."
  },
  {
    "severity": "critical",
    "files": ["frontend/.env.example", "frontend/src/hooks/useCalculator.js"],
    "description": "Frontend uses VITE_API_URL instead of API_BASE_URL for backend API URL.",
    "fix_hint": "Rename VITE_API_URL to API_BASE_URL in .env.example and update all code to use import.meta.env.API_BASE_URL."
  },
  {
    "severity": "critical",
    "files": [".dockerignore"],
    "description": ".dockerignore file is missing.",
    "fix_hint": "Create .dockerignore at project root to exclude node_modules, dist, .git, logs, etc."
  }
]
```