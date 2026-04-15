#!/bin/bash
# Calculadora Basica v1 - Startup Script
# This script automatically creates .env, builds and starts all services

set -e

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored messages
print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if Docker is installed
print_status "Checking Docker installation..."
if ! command -v docker &> /dev/null; then
    print_error "Docker is not installed. Please install Docker first."
    exit 1
fi

if ! command -v docker-compose &> /dev/null && ! docker compose version &> /dev/null; then
    print_error "Docker Compose is not installed. Please install Docker Compose first."
    exit 1
fi

# Auto-create .env from .env.example if it doesn't exist
print_status "Checking environment configuration..."
if [ ! -f .env ]; then
    if [ -f .env.example ]; then
        cp .env.example .env
        print_status ".env created from .env.example"
    else
        print_warning ".env.example not found. Creating default .env..."
        cat > .env << 'EOF'
# Backend Configuration
PORT=8080
ALLOWED_ORIGIN=http://localhost

# Frontend Configuration
API_BASE_URL=http://localhost:8080
EOF
        print_status ".env created with default values"
    fi
fi

# Validate environment variables
print_status "Validating environment variables..."
source .env

if [ -z "$PORT" ]; then
    print_error "PORT is not set in .env"
    exit 1
fi

if [ -z "$ALLOWED_ORIGIN" ]; then
    print_warning "ALLOWED_ORIGIN is not set, using default"
    export ALLOWED_ORIGIN=http://localhost
fi

if [ -z "$API_BASE_URL" ]; then
    print_warning "API_BASE_URL is not set, using default"
    export API_BASE_URL=http://localhost:8080
fi

# Stop any existing containers
print_status "Stopping existing containers..."
docker compose down --remove-orphans 2>/dev/null || true

# Build and start services
print_status "Building Docker images..."
docker compose build --parallel

print_status "Starting services..."
docker compose up -d

# Wait for services to be healthy
print_status "Waiting for services to become healthy..."

# Check backend health
BACKEND_HEALTHY=false
for i in {1..30}; do
    if docker compose exec -T backend wget --no-verbose --tries=1 --spider http://localhost:8080/health &>/dev/null; then
        BACKEND_HEALTHY=true
        break
    fi
    sleep 1
done

if [ "$BACKEND_HEALTHY" = false ]; then
    print_error "Backend failed to become healthy"
    docker compose logs backend
    exit 1
fi

print_status "Backend is healthy"

# Check frontend health
FRONTEND_HEALTHY=false
for i in {1..30}; do
    if docker compose exec -T frontend wget --no-verbose --tries=1 --spider http://localhost:80 &>/dev/null; then
        FRONTEND_HEALTHY=true
        break
    fi
    sleep 1
done

if [ "$FRONTEND_HEALTHY" = false ]; then
    print_error "Frontend failed to become healthy"
    docker compose logs frontend
    exit 1
fi

print_status "Frontend is healthy"

# Print access information
echo ""
echo "========================================="
print_status "Calculadora Basica v1 is running!"
echo "========================================="
echo ""
echo "  Frontend: http://localhost"
echo "  Backend:  http://localhost:8080"
echo "  API:      http://localhost:8080/api/calculate"
echo ""
echo "To view logs: docker compose logs -f"
echo "To stop:     docker compose down"
echo ""
