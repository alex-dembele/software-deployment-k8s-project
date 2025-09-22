#!/bin/bash
# Explication: Installe Minikube et outils.
minikube start
kubectl apply -f manifests/namespace.yaml
helm repo add bitnami https://charts.bitnami.com/bitnami