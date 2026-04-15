# SPEC.md

## 1. TECHNOLOGY STACK

- **Frontend**
  - HTML5
  - CSS3
  - JavaScript ES6+
- **Backend (optional, for API)**
  - Node.js v18.x
  - Express.js v4.18.x
- **Version Control & Deployment**
  - Git
  - GitHub
  - GitHub Pages (for static frontend hosting)
- **Tooling**
  - npm v9.x (for dependency management if backend is present)

## 2. DATA CONTRACTS

### JavaScript (Frontend & Backend)

#### OperationRequest

```js
// OperationRequest
{
  operand1: number,      // Primer operando
  operand2: number,      // Segundo operando
  operation: "add" | "subtract" // Tipo de operación: 'add' (suma) o 'subtract' (resta)
}
```

#### OperationResponse

```js
// OperationResponse
{
  result: number,        // Resultado de la operación
  formattedResult: string // Resultado formateado como string (ej: "1,234.56")
}
```

#### ErrorResponse

```js
// ErrorResponse
{
  error: string // Mensaje de error legible para el usuario
}
```

### TypeScript (if used)

```ts
// OperationRequest
export interface OperationRequest {
  operand1: number;
  operand2: number;
  operation: "add" | "subtract";
}

// OperationResponse
export interface OperationResponse {
  result: number;
  formattedResult: string;
}

// ErrorResponse
export interface ErrorResponse {
  error: string;
}
```

## 3. API ENDPOINTS

### POST /api/calculate

- **Description:** Realiza una operación aritmética básica (suma o resta) entre dos operandos.
- **Method:** POST
- **Path:** `/api/calculate`
- **Request Body:** `OperationRequest`
  ```json
  {
    "operand1": 12.5,
    "operand2": 7.3,
    "operation": "add"
  }
  ```
- **Response 200:** `OperationResponse`
  ```json
  {
    "result": 19.8,
    "formattedResult": "19.80"
  }
  ```
- **Response 400:** `ErrorResponse`
  ```json
  {
    "error": "Operación no soportada o datos inválidos"
  }
  ```

## 4. FILE STRUCTURE

```
calculadora-basica-v1/
├── backend/                        # Lógica de API (opcional)
│   ├── Dockerfile                  # Dockerfile para backend (Node.js/Express)
│   ├── server.js                   # Entry point del servidor Express
│   ├── routes/
│   │   └── calculate.js            # Ruta /api/calculate y lógica de cálculo
│   ├── validators/
│   │   └── operationValidator.js   # Validación de datos de entrada
│   ├── formatters/
│   │   └── numberFormatter.js      # Formateo de resultados numéricos
│   ├── .env.example                # Variables de entorno de backend
│   └── README.md                   # Documentación backend
├── frontend/
│   ├── Dockerfile                  # Dockerfile para frontend (static)
│   ├── public/
│   │   └── index.html              # HTML principal
│   ├── src/
│   │   ├── main.js                 # Entry point JS
│   │   ├── components/
│   │   │   ├── Calculator.js       # Componente principal de calculadora
│   │   │   ├── ResultDisplay.js    # Componente para mostrar resultados
│   │   │   └── ErrorMessage.js     # Componente para mostrar errores
│   │   ├── hooks/
│   │   │   └── useCalculator.js    # Hook para lógica de cálculo y estado
│   │   └── styles/
│   │       └── calculator.css      # Estilos de la calculadora
│   ├── .env.example                # Variables de entorno frontend
│   └── README.md                   # Documentación frontend
├── docker-compose.yml              # Orquestación de servicios
├── run.sh                          # Script de arranque de ambos servicios
├── .gitignore                      # Exclusiones de git
└── README.md                       # Documentación general del proyecto
```

### PORT TABLE

| Service    | Listening Port | Path            |
|------------|---------------|-----------------|
| backend    | 8080          | backend/        |

### SHARED MODULES

_No shared modules between services in this monorepo. Each service is self-contained._

## 5. ENVIRONMENT VARIABLES

### backend/.env.example

| Name           | Type   | Description                                      | Example Value      |
|----------------|--------|--------------------------------------------------|-------------------|
| PORT           | number | Puerto en el que escucha el backend              | 8080              |
| ALLOWED_ORIGIN | string | Origen permitido para CORS                       | http://localhost  |

### frontend/.env.example

| Name           | Type   | Description                                      | Example Value      |
|----------------|--------|--------------------------------------------------|-------------------|
| API_BASE_URL   | string | URL base del backend para llamadas API           | http://localhost:8080 |

## 6. IMPORT CONTRACTS

### backend/server.js

```js
const express = require('express');
const { calculateHandler } = require('./routes/calculate');
```

### backend/routes/calculate.js

```js
const { validateOperationRequest } = require('../validators/operationValidator');
const { formatNumber } = require('../formatters/numberFormatter');
module.exports = { calculateHandler };
```

### backend/validators/operationValidator.js

```js
function validateOperationRequest(reqBody) // Exporta validateOperationRequest
module.exports = { validateOperationRequest };
```

### backend/formatters/numberFormatter.js

```js
function formatNumber(num) // Exporta formatNumber
module.exports = { formatNumber };
```

### frontend/src/hooks/useCalculator.js

```js
// Exporta useCalculator
export function useCalculator() // Hook principal
```

### frontend/src/components/Calculator.js

```js
// Exporta Calculator
export default Calculator;
```

### frontend/src/components/ResultDisplay.js

```js
// Exporta ResultDisplay
export default ResultDisplay;
```

### frontend/src/components/ErrorMessage.js

```js
// Exporta ErrorMessage
export default ErrorMessage;
```

## 7. FRONTEND STATE & COMPONENT CONTRACTS

### Shared State Hook

```js
useCalculator() → {
  operand1,                // number
  operand2,                // number
  operation,               // "add" | "subtract"
  result,                  // number | null
  formattedResult,         // string | null
  error,                   // string | null
  loading,                 // boolean
  setOperand1,             // (value: number) => void
  setOperand2,             // (value: number) => void
  setOperation,            // (value: "add" | "subtract") => void
  calculate,               // () => Promise<void>
  clear,                   // () => void
}
```

### Component Props

```
Calculator props: {
  operand1: number,
  operand2: number,
  operation: "add" | "subtract",
  setOperand1: (value: number) => void,
  setOperand2: (value: number) => void,
  setOperation: (value: "add" | "subtract") => void,
  onCalculate: () => void,
  loading: boolean
}

ResultDisplay props: {
  result: number | null,
  formattedResult: string | null
}

ErrorMessage props: {
  error: string | null
}
```

## 8. FILE EXTENSION CONVENTION

- **Frontend files:** `.js` (JavaScript project — all files use .js/.css/.html)
- **Backend files:** `.js` (Node.js/Express project — all files use .js)
- **Entry point:** `/src/main.js` (referenciado en `<script src="/src/main.js"></script>` en `public/index.html`)
- **No TypeScript or JSX/TSX files are used.** All code is plain JavaScript ES6+.

---

**CRITICAL:**
- All field names, function names, and props must match exactly as specified above.
- API request/response schemas must be strictly adhered to.
- All files listed in the file structure must be present in the generated codebase.
- Environment variables must be referenced verbatim as declared.
- All frontend state and component contracts must be implemented with the exact property and function names.