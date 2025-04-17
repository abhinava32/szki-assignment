# Project Structure

This project is organized into three main directories:

## Frontend

The frontend directory contains the client-side application code built with Next.js.

## Backend

The backend directory contains the server-side application code built with Express.js and TypeScript.

## Docker

The docker directory contains Docker-related configuration files and Kubernetes deployment manifests.

## Getting Started

### Prerequisites

- Node.js v18 or higher
- Docker v24 or higher
- Kubernetes (Minikube) v1.28 or higher
- kubectl v1.28 or higher

### Local Development

1. Clone the repository
2. Install dependencies:

   ```bash
   # Frontend
   cd frontend
   npm install

   # Backend
   cd ../backend
   npm install
   ```

3. Start the development servers:

   ```bash
   # Frontend (in frontend directory)
   npm run dev

   # Backend (in backend directory)
   npm run dev
   ```

### Docker Deployment

1. Build and run using Docker Compose:

   ```bash
   docker-compose up --build
   ```

2. Access the services:
   - Frontend: http://localhost:3000
   - Backend: http://localhost:3001

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
   kubectl apply -f docker/k8s/frontend-deployment.yaml
   kubectl apply -f docker/k8s/frontend-service.yaml
   kubectl apply -f docker/k8s/backend-deployment.yaml
   kubectl apply -f docker/k8s/backend-service.yaml
   ```

4. Access the services:
   ```bash
   minikube service frontend-service
   ```

## Project Architecture

### Frontend

- Next.js application
- TypeScript support
- Tailwind CSS for styling
- Dockerized for production
- Kubernetes deployment with 3 replicas
- Health checks and resource limits configured

### Backend

- Express.js server
- TypeScript support
- RESTful API
- Dockerized for production
- Kubernetes deployment with 3 replicas
- Health checks and resource limits configured

### Kubernetes Configuration

- Frontend Service: NodePort (port 30000)
- Backend Service: ClusterIP (internal only)
- Health checks for both services
- Resource limits and requests configured
- Multiple replicas for high availability

## Environment Variables

### Frontend

- `NEXT_PUBLIC_API_URL`: Backend service URL (default: http://backend-service:3001)

### Backend

- `NODE_ENV`: Environment (development/production)
- `PORT`: Server port (default: 3001)

## Monitoring and Maintenance

To check the status of your Kubernetes deployments:

```bash
kubectl get deployments
kubectl get pods
kubectl get services
```

To view logs:

```bash
kubectl logs -f deployment/frontend-deployment
kubectl logs -f deployment/backend-deployment
```

## Troubleshooting

1. If services are not accessible:

   - Check pod status: `kubectl get pods`
   - View pod logs: `kubectl logs <pod-name>`
   - Check service status: `kubectl get services`

2. If Docker builds fail:

   - Ensure Docker daemon is running
   - Check for sufficient disk space
   - Verify network connectivity

3. If Kubernetes deployments fail:
   - Check Minikube status: `minikube status`
   - Verify image loading: `minikube image ls`
   - Check resource availability: `kubectl describe nodes`
