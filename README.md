# Pet Hero !

Assumes docker is installed with Docker compose.

```bash
# Dev
docker plugin install grafana/loki-docker-driver:latest --alias loki --grant-all-permissions
docker compose -f docker-compose.yml -f docker-compose-dev.yml up -d --build
```

# Prod

docker compose -f docker-compose.yml -f docker-compose-prod.yml up -d --build

# Deployment stuff

cd deployment
docker compose up -d
