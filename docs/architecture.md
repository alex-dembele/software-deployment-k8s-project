# Architecture

```mermaid
graph TD
    User --> Ingress
    Ingress --> Frontend
    Frontend --> Agenda[Agenda Service] --> Redis
    Frontend --> C4P[C4P Service] --> Postgres
    Frontend --> Notifications