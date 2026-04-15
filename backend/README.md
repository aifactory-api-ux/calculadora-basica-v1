# Calculadora Basica v1 - Backend

Backend API for the Calculadora Básica v1 project. Provides a REST API for performing basic arithmetic operations (addition and subtraction).

## Technology Stack

- Node.js v18.x
- Express.js v4.18.x

## Prerequisites

- Node.js 18.x or higher
- npm 9.x or higher

## Installation

1. Install dependencies:

```bash
npm install
```

2. Copy the environment file:

```bash
cp .env.example .env
```


3. Update the `.env` file with your configuration.

## Running the Server

### Development Mode

```bash
npm run dev
```

### Production Mode

```bash
npm start
```

The server will start on the port specified in the `.env` file (default: 8080).


## API Endpoints

### Health Check

**GET /health**

Returns the service health status.


Response:
```json
{
  "status": "healthy",
  "service": "calculadora-basica-v1",
  "version": "1.0.0"
}
```

### Calculate

**POST /api/calculate**


Performs a calculation operation.


Request Body:
```json
{
  "operand1": 12.5,
  "operand2": 7.3,
  "operation": "add"
}
```

Response (200):
```json
{
  "result": 19.8,
  "formattedResult": "19.80"
}
```

Response (400):
```json
{
  "error": "Operación no soportada o datos inválidos"
}
```


## Supported Operations


- `add` - Addition (operand1 + operand2)
- `subtract` - Subtraction (operand1 - operand2)

## Testing

Run the tests:

```bash
npm test
```

## Docker

Build the Docker image:


```bash
docker build -t calculadora-basica-v1-backend .
```

Run the container:

```bash
docker run -p 8080:8080 --env-file .env calculadora-basica-v1-backend
```
