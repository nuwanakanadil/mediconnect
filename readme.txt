MediConnect Deployment Steps (Starter: frontend + doctor_service + MongoDB)

Option A: Docker Compose (recommended for quick demo)
1) Open terminal at project root.
2) Run:
   docker compose up --build -d
3) Open frontend:
   http://localhost:4200
4) Doctor API base:
   http://localhost:8083/api
5) Stop containers:
   docker compose down

Option B: Kubernetes (Minikube / Docker Desktop K8s)
Prerequisites:
- kubectl configured to your cluster
- Docker images built and available to cluster

1) Build images from project root:
   docker build -t mediconnect/doctor-service:latest ./service/doctor_service
   docker build -t mediconnect/frontend:latest ./frontend

2) If using Minikube, load images:
   minikube image load mediconnect/doctor-service:latest
   minikube image load mediconnect/frontend:latest

3) Apply manifests:
   kubectl apply -f k8s/namespace.yaml
   kubectl apply -f k8s/mongodb.yaml
   kubectl apply -f k8s/doctor-service.yaml
   kubectl apply -f k8s/frontend.yaml

4) Verify resources:
   kubectl get pods -n mediconnect
   kubectl get svc -n mediconnect

5) Port-forward services for local browser access:
   kubectl port-forward -n mediconnect svc/frontend 4200:80
   kubectl port-forward -n mediconnect svc/doctor-service 8083:8083

6) Open frontend:
   http://localhost:4200

Notes:
- The frontend currently calls API at http://localhost:8083/api.
- Keep doctor-service port-forward active while testing Kubernetes setup.
