### Kubernetes Best Practices for the Conference App

This document outlines key Kubernetes best practices implemented in this project, inspired by "Software Deployment with Kubernetes" by Mauricio Salatino. Focus areas include Ingress for external routing, Horizontal Pod Autoscaler (HPA) for scaling, and other essentials like ConfigMaps, Secrets, and release strategies. These practices ensure reliable, scalable, and secure deployments.
1. Use Namespaces for Isolation

Always deploy resources in a dedicated namespace (e.g., conference) to isolate the app from other workloads.
Why? Prevents naming conflicts and enables RBAC (Role-Based Access Control) for security.
Example from project: kubectl apply -f manifests/namespace.yaml

2. Externalize Configuration with ConfigMaps and Secrets

Use ConfigMaps for non-sensitive data (e.g., REDIS_URL).
Use Secrets for sensitive info (e.g., DB passwords, base64-encoded).
Why? Follows the 12-factor app methodology (ch.1 of the book). Allows config changes without rebuilding images.
Example: In manifests/configmap-app.yaml and secret-db.yaml. Inject via envFrom in Deployments.
Best practice: Never hardcode secrets in code or YAML; use Kubernetes Secrets Manager or external tools like HashiCorp Vault in production.

3. Ingress for External Access

Use Ingress to expose services externally, routing HTTP/HTTPS traffic to pods.
Configure rules for paths (e.g., / to frontend).
Why? Centralizes routing, supports TLS termination, and load balancing. Avoids NodePort/LoadBalancer for production (exposes unnecessary ports).
Example: manifests/ingress.yaml with NGINX Ingress Controller.

Install controller: kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.8.0/deploy/static/provider/cloud/deploy.yaml
Tip: Add annotations for SSL (e.g., cert-manager.io/cluster-issuer: "letsencrypt" for auto-TLS).


From the book (ch.4): Combine with Knative Serving for advanced traffic splitting in pro version, enabling canary releases without disrupting users.

4. Horizontal Pod Autoscaler (HPA) for Autoscaling

Scale pods based on metrics like CPU utilization (e.g., target 50%).
Why? Handles variable load automatically, improving efficiency and resilience (ch.4 on release strategies).
Example: manifests/hpa-frontend.yaml
yaml