# Calculadora Básica v1

A minimal, lightweight web calculator supporting basic addition and subtraction operations.

## 🚀 Quick Start

```bash
# Run the application (auto-creates .env if missing)
./run.sh
```

The calculator will be available at **http://localhost**

## 📋 Requirements

- Docker
- Docker Compose

## 🛠️ Technology Stack

- **Frontend**: HTML5, CSS3, JavaScript ES6+
- **Backend**: Node.js 18.x, Express.js 4.18.x
- **Containerization**: Docker, Docker Compose
- **Deployment**: GitHub Pages (static hosting)

## 📁 Project Structure

```
calculadora-basica-v1/
├── backend/                    # Express.js API server
│   ├── Dockerfile
│   ├── server.js              # Entry point
│   ├── routes/                # API routes
│   ├── validators/            # Input validation
│   ├── formatters/            # Output formatting
│   └── shared/                # Common utilities
├── frontend/                   # Static web UI
│   ├── Dockerfile
│   ├── public/                # Static assets
│   │   └── index.html
│   └── src/                   # JavaScript sources
│       ├── components/        # UI components
│       ├── hooks/             # State management
│       └── styles/            # CSS styles
├── docker-compose.yml         # Service orchestration
├── run.sh                     # Startup script
└── .env.example              # Environment template
```

## ⚙️ Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Backend server port | 8080 |
| `ALLOWED_ORIGIN` | CORS allowed origin | http://localhost |
| `API_BASE_URL` | Backend API URL | http://localhost:8080 |

## 🔧 Development

### Using Docker

```bash
# Start all services
docker compose up -d

# View logs
docker compose logs -f

# Stop services
docker compose down
```

### Manual Development

**Backend:**
```bash
cd backend
npm install
cp .env.example .env
npm start
```

**Frontend:**
```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

## 🧪 Testing

The backend includes unit tests for:
- Data contracts validation
- Input validation
- Number formatting

Run tests:
```bash
cd backend
npm test
```

## 📝 API Reference

### POST /api/calculate

Performs addition or subtraction of two operands.

**Request:**
```json
{
  "operand1": 10.5,
  "operand2": 5.2,
  "operation": "add"
}
```

**Response (Success):**
```json
{
  "result": 15.7,
  "formattedResult": "15.70"
}
```

**Response (Error):**
```json
{
  "error": "operand1 must be a number"
}
```

### GET /health

Health check endpoint for Docker healthchecks.

## 🔒 Security Notes

- Environment variables contain no hardcoded secrets
- CORS is configured via ALLOWED_ORIGIN
- Input validation prevents invalid operations
- Non-root user in Docker containers

## 📄 License

MIT
