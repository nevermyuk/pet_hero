# Pet Hero !

Assumes docker is installed with Docker compose.

```bash
# Dev
docker plugin install grafana/loki-docker-driver:latest --alias loki --grant-all-permissions
docker compose -f compose-nginx-dev.yml -f docker-compose.yml -f docker-compose-dev.yml up -d

```

Add domain to host file, Must save in admin
[Add host to WSL](https://stackoverflow.com/questions/65707002/how-to-set-up-custom-hostnames-and-ports-for-servers-eg-node-js-running-in-wsl)

```bash
code C:\Windows\System32\drivers\etc\hosts

#Added the following to host file and save, required admin permission
127.0.0.1 pethero.test
127.0.0.1 jenkins.pethero.test
127.0.0.1 api.pethero.test localhost
127.0.0.1 dashboard.pethero.test localhost
::1 pethero.test localhost
::1 jenkins.pethero.test localhost
::1 api.pethero.test localhost
::1 dashboard.pethero.test localhost

```

```bash

```

# Prod

docker compose -f docker-compose.yml -f docker-compose-prod.yml up -d --build

# Deployment stuff

cd deployment
docker compose up -d
