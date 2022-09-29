# Pet Hero !

```bash
# Dev

docker compose -f docker-compose.yml -f docker-compose-dev.yml up -d --build
# Prod
docker compose -f docker-compose.yml -f docker-compose-prod.yml up -d --build
```

# Run frontend

docker run -v /home/nevermyuk/pet_hero/frontend/src:/app/src:ro -d -p 3000:3000 --name pet-hero-frontend pet-hero-frontend

docker run --env-file ./.env -d -p 8080:80 --name react-app docker-image-prod
