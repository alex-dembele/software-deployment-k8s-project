#!/bin/bash
# Explication: Déploie avec Helm, pas à pas.
helm install conference ./helm-charts/conference-app/
kubectl port-forward -n conference svc/frontend 8080:80
echo "Access at http://localhost:8080"