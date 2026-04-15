# Frontend - Calculadora Básica v1

Frontend de la Calculadora Básica v1, una aplicación web minimalista para realizar operaciones de suma y resta.

## Tecnologías

- HTML5
- CSS3
- JavaScript ES6+
- Vite (herramienta de build)

## Estructura del Proyecto

```
frontend/
├── public/
│   └── index.html          # Punto de entrada HTML
├── src/
│   ├── main.js           # Entry point JavaScript
│   ├── components/
│   │   ├── Calculator.js    # Componente principal
│   │   ├── ResultDisplay.js # Display de resultados
│   │   └── ErrorMessage.js # Mensajes de error
│   ├── hooks/
│   │   └── useCalculator.js # Hook de estado y lógica
│   └── styles/
│       └── calculator.css  # Estilos CSS
├── .env.example
├── package.json
└── vite.config.js
```

## Configuración

### Variables de Entorno

Copia `.env.example` a `.env` y configura:

```env
VITE_API_URL=http://localhost:8080
```

## Desarrollo

### Requisitos

- Node.js 18.x
- npm 9.x

### Instalación

```bash
cd frontend
npm install
```

### Ejecución en Desarrollo

```bash
npm run dev
```

El servidor de desarrollo estará disponible en `http://localhost:3000`

### Build para Producción

```bash
npm run build
```

Los archivos.Buildidos se generarán en el directorio `dist/`

### Preview del Build

```bash
npm run preview
```

## Funcionalidades

- **Suma**: Operación de adición entre dos operandos
- **Resta**: Operación de sustracción entre dos operandos
- **Limpiar**: Botón 'C' para reiniciar la calculadora
- **Validación**: Validación de entrada en tiempo real
- **Manejo de Errores**: Mensajes de error claros para el usuario

## API

El frontend se comunica con el backend vía REST API:

- **Endpoint**: `POST /api/calculate`
- **Headers**: `Content-Type: application/json`
- **Body**:
  ```json
  {
    "operand1": 10,
    "operand2": 5,
    "operation": "add"
  }
  ```
- **Respuesta exitosa**:
  ```json
  {
    "result": 15,
    "formattedResult": "15.00"
  }
  ```
- **Respuesta de error**:
  ```json
  {
    "error": "Mensaje de error legible"
  }
  ```

## Docker

### Construcción de Imagen

```bash
docker build -t calculadora-basica-frontend .
```

### Ejecución de Contenedor

```bash
docker run -p 3000:80 calculadora-basica-frontend
```

## Licencia

MIT
