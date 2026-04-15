# Arquitectura Técnica - Calculadora Básica v1

## Visión General

Proyecto de calculadora web simple con funcionalidades matemáticas básicas, diseñada para ser ligera, rápida y compatible con todos los navegadores modernos.

## Arquitectura

### Patrón Arquitectónico

**Arquitectura Monolítica Cliente-Side**: Toda la lógica de presentación y procesamiento reside en el navegador del usuario. El backend es opcional y solo proporciona servicios de API para validación externa y formateo de resultados.

```
┌─────────────────────────────────────────┐
│           Navegador del Usuario          │
├─────────────────────────────────────────┤
│  Frontend (HTML5 + CSS3 + JS ES6+)      │
│  ┌─────────────────────────────────┐    │
│  │  Interfaz de Usuario             │    │
│  │  - Calculator.js                │    │
│  │  - ResultDisplay.js             │    │
│  │  - ErrorMessage.js             │    │
│  └─────────────────────────────────┘    │
│  ┌─────────────────────────────────┐    │
│  │  Lógica de Aplicación           │    │
│  │  - useCalculator.js (hook)      │    │
│  │  - validation.js                │    │
│  └─────────────────────────────────┘    │
│  ┌─────────────────────────────────┐    │
│  │  Estilos                        │    │
│  │  - calculator.css               │    │
│  └─────────────────────────────────┘    │
│                     │                    │
│                     ▼                    │
│           ┌──────────────┐              │
│           │ API REST     │ (Opcional)    │
│           │ /api/calculate│              │
│           └──────────────┘              │
└─────────────────────────────────────────┘
```

## Componentes Principales

### 1. Interfaz de Usuario (Frontend)


#### Calculator.js
- Componente principal de la calculadora
- Gestiona la entrada de operandos y selección de operador
- Botones numéricos, operadores (+, -) y botón de limpiar (C)
- Comunicación con el hook useCalculator para el estado

#### ResultDisplay.js
- Componente para mostrar el resultado formateado
- Muestra el valor numérico con formato de miles y dos decimales
- Manejo de estados: vacío, cargando, resultado

#### ErrorMessage.js
- Componente para mostrar mensajes de error
- Muestra errores de validación o errores del servidor
- Diseño visual distintivo para alertas

### 2. Motor de Cálculo (Backend - Opcional)

#### Routes/calculate.js
- Endpoint REST: `POST /api/calculate`
- Procesa solicitudes de operación matemática
- Valida entrada y retorna resultado formateado o error

#### Validators/operationValidator.js
- Validación de datos de entrada según contratos
- Verifica tipos de datos y valores permitidos

#### Formatters/numberFormatter.js
- Formatea resultados numéricos
- Añade separadores de miles y dos decimales

### 3. Manejador de Estado (Hook)

#### useCalculator.js
- Estado compartido para toda la aplicación
- Gestiona operandos, operación, resultado, errores
- Métodos: setOperand1, setOperand2, setOperation, calculate, clear

## Modelos de Datos

### OperationRequest

```typescript
interface OperationRequest {
  operand1: number;      // Primer operando
  operand2: number;      // Segundo operando
  operation: "add" | "subtract"; // Tipo de operación
}
```

### OperationResponse

```typescript
interface OperationResponse {
  result: number;        // Resultado numérico
  formattedResult: string; // Resultado formateado (ej: "1,234.56")
}
```

### ErrorResponse

```typescript
interface ErrorResponse {
  error: string;         // Mensaje de error legible
}
```

## Stack Tecnológico

### Frontend

| Tecnología | Propósito |
|------------|-----------|
| HTML5 | Estructura de la página |
| CSS3 | Estilos y diseño responsivo |
| JavaScript ES6+ | Lógica de aplicación y manipular DOM |
| Vite | Build tool y servidor de desarrollo |

### Backend (Opcional)

| Tecnología | Propósito |
|------------|-----------|
| Node.js 18.x | Entorno de ejecución |
| Express.js 4.18.x | Framework servidor HTTP |
| CORS | Configuración de origen cruzado |

### Infraestructura

| Tecnología | Propósito |
|------------|-----------|
| Git | Control de versiones |
| GitHub | Alojamiento de código |
| GitHub Pages | Hosting estático (frontend) |
| Docker | Containerización |
| Nginx | Servidor web estático |

## Despliegue

### Estrategia de Hosting

**Estático sin servidor**: Se aprovecha servicios gratuitos como GitHub Pages para el frontend y el backend (si se usa) puede desplegarse en servicios like Railway, Render o Heroku.

### Puertos de Servicio

| Servicio | Puerto | Descripción |
|----------|--------|-------------|
| frontend (dev) | 3000 | Servidor de desarrollo Vite |
| frontend (preview) | 3001 | Preview del build |
| backend | 8080 | Servidor Express |
| nginx (docker) | 80 | Servidor en contenedor |

### Healthchecks

- Frontend: GET / (retorna 200 si index.html existe)
- Backend: GET /api/health (retorna estado del servicio)

## Consideraciones de Escalabilidad

### Extensiones Futuras

El diseño actual permite fácil extensión para:


1. **Nuevas operaciones**: Multiplicación, división, porcentajes
2. **Persistencia**: Historial de cálculos en localStorage o BD
3. **Aplicación móvil**: Conversión a React Native o Flutter
4. **Múltiples idiomas**: Internacionalización (i18n)
5. **Modo offline**: Service Workers para funcionamiento sin conexión

### Límites del Alcance

- Solo operaciones básicas: suma y resta
- Sin memoria de cálculos
- Sin historial
- Sin funcionalidades avanzadas

## Seguridad

### Validación de Entrada

- Todos los datos de entrada se validan en backend y frontend
- Tipos estrictos: operandos deben ser números
- Valores de operación restringidos a "add" o "subtract"
- Sanitización de entrada para previr inyección

### Variables de Entorno

- Nunca hardcodear credenciales o secretos
- Usar variables de entorno para URLs de API
- Fallar con mensaje claro si falta variable requerida

## Rendimiento

### Objetivos

- Tiempo de respuesta < 100ms para operaciones básica
- Tamaño de bundle < 50KB (sin compresión)
- First Contentful Paint < 1s en conexión 3G

### Optimizaciones

- Código splitting no necesario para app minimalista
- CSS crítico enlined en index.html
- Imágenes optimizadas si se incluyen
- Compresión gzip en producción

## Pruebas

### Tipos de Pruebas

- **Unitarias**: Funciones de validación y formateo
- **Integración**: Componentes con el hook de estado
- **E2E**: Flujo completo de usuario (calculadora funcional)

### Cobertura

- Validación de entrada: 100%
- Formateo de números: 100%
- Componentes UI: Pruebas manuales

## Glosario

| Término | Definición |
|---------|------------|
| Frontend | Parte de la aplicación que interactúa con el usuario |
| Backend | Servidor que procesa solicitudes API |
| Hook | Función de React para gestionar estado |
| API | Interfaz de programación de aplicaciones |
| REST | Estilo architectural para servicios web |
| CORS | Cross-Origin Resource Sharing |
| Vite | Build tool moderno para proyectos web |
