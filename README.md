# User Management System

A scalable microservices application with a Next.js frontend and Express.js backend, containerized with Docker and orchestrated using Docker Compose or Kubernetes.

## Features

- User management (CRUD operations)
- Scalable architecture with load balancing
- Containerized deployment
- Single entry point through Nginx
- Kubernetes deployment support

## Prerequisites

- Docker v24 or higher
- Docker Compose v2 or higher
- Node.js v18 or higher (for local development)
- MongoDB (for local development)
- Kubernetes (Minikube) v1.28 or higher (for Kubernetes deployment)
- kubectl v1.28 or higher (for Kubernetes deployment)

## Environment Setup

### Local Development

1. Frontend Environment:

   ```bash
   cd frontend
   cp .env.example .env
   ```

   Configure the following variables in `.env`:

   - `NEXT_PUBLIC_API_URL`: Backend API URL (http://localhost:4000/api for local)
   - `NEXT_PUBLIC_APP_NAME`: Application name
   - `NEXT_PUBLIC_APP_ENV`: Environment (development/production)
   - `NEXT_PUBLIC_ENABLE_ANALYTICS`: Enable analytics (true/false)
   - `NEXT_PUBLIC_ENABLE_ERROR_REPORTING`: Enable error reporting (true/false)
   - `NEXT_PUBLIC_AUTH_ENABLED`: Enable authentication (true/false)
   - `NEXT_PUBLIC_AUTH0_DOMAIN`: Auth0 domain (if auth enabled)
   - `NEXT_PUBLIC_AUTH0_CLIENT_ID`: Auth0 client ID (if auth enabled)

2. Backend Environment:
   ```bash
   cd backend
   cp .env.example .env
   ```
   Configure the following variables in `.env`:
   - `PORT`: Server port (4000)
   - `NODE_ENV`: Environment (development/production)
   - `MONGODB_URI`: MongoDB connection string
   - `JWT_SECRET`: Secret for JWT token generation
   - `JWT_EXPIRES_IN`: JWT token expiration time
   - `LOG_LEVEL`: Logging level (debug/info/warn/error)
   - `RATE_LIMIT_WINDOW_MS`: Rate limiting window
   - `RATE_LIMIT_MAX_REQUESTS`: Maximum requests per window

### Docker Development

1. Frontend Environment:

   ```bash
   cd frontend
   cp .env.example .env
   ```

   Set `NEXT_PUBLIC_API_URL=http://backend:4000/api`

2. Backend Environment:
   ```bash
   cd backend
   cp .env.example .env
   ```
   Set `MONGODB_URI=mongodb://mongodb:27017/your-database`

## Quick Start

### Local Development

1. Start MongoDB:

   ```bash
   mongod
   ```

2. Start Backend:

   ```bash
   cd backend
   npm install
   npm run dev
   ```

3. Start Frontend:

   ```bash
   cd frontend
   npm install
   npm run dev
   ```

4. Access the application:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:4000/api

### Docker Development

1. Clone the repository
2. Start the services:
   ```bash
   docker-compose up -d --build
   ```
3. Access the application:
   - Frontend: http://localhost
   - API: http://localhost/api

## Scaling Services

Scale frontend and backend services:

```bash
# Scale to 5 frontend and 3 backend instances
docker-compose up -d --scale frontend=5 --scale backend=3

# Check running instances
docker-compose ps

# View logs
docker-compose logs -f
```

## Architecture

- **Frontend**: Next.js application
- **Backend**: Express.js API
- **Nginx**: Reverse proxy and load balancer
- **Docker Network**: Internal communication between services

## Production Deployment

### Docker Compose Deployment

1. Build and start:

   ```bash
   docker-compose up -d --build
   ```

2. Scale services as needed:
   ```bash
   docker-compose up -d --scale frontend=5 --scale backend=3
   ```

### Kubernetes Deployment

1. Start Minikube:

   ```bash
   minikube start
   ```

2. Build and load Docker images:

   ```bash
   # Build images
   docker build -t frontend:latest ./frontend
   docker build -t backend:latest ./backend

   # Load images into Minikube
   minikube image load frontend:latest
   minikube image load backend:latest
   ```

3. Deploy to Kubernetes:

   ```bash
   # Apply Kubernetes configurations
   kubectl apply -f docker/k8s/frontend-deployment.yaml
   kubectl apply -f docker/k8s/frontend-service.yaml
   kubectl apply -f docker/k8s/backend-deployment.yaml
   kubectl apply -f docker/k8s/backend-service.yaml
   ```

4. Access the services:
   ```bash
   # Get the frontend service URL
   minikube service frontend-service --url
   ```

## Monitoring

### Docker Compose Monitoring

Check service status:

```bash
# View running containers
docker-compose ps

# View logs
docker-compose logs -f

# View nginx logs
docker-compose logs nginx
```

### Kubernetes Monitoring

```bash
# Check deployments
kubectl get deployments

# Check pods
kubectl get pods

# Check services
kubectl get services

# View logs
kubectl logs -f deployment/frontend-deployment
kubectl logs -f deployment/backend-deployment
```

## Troubleshooting

### Docker Compose Issues

1. If services don't start:

   ```bash
   docker-compose down
   docker-compose build --no-cache
   docker-compose up -d
   ```

2. Check nginx configuration:
   ```bash
   docker-compose exec nginx nginx -t
   ```

### Kubernetes Issues

1. If services are not accessible:

   ```bash
   # Check pod status
   kubectl get pods

   # View pod logs
   kubectl logs <pod-name>

   # Check service status
   kubectl get services
   ```

2. If deployments fail:

   ```bash
   # Check Minikube status
   minikube status

   # Verify image loading
   minikube image ls

   # Check resource availability
   kubectl describe nodes
   ```

## Cleanup

### Docker Compose Cleanup

```bash
# Stop services and remove volumes
docker-compose down -v

# Remove all containers, networks, and volumes
docker system prune -a --volumes
```

### Kubernetes Cleanup

```bash
# Delete deployments
kubectl delete -f docker/k8s/

# Delete secrets
kubectl delete secret backend-secrets

# Stop Minikube
minikube stop
```

## License

MIT
