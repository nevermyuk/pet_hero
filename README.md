# Pet Hero !

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

Assumes docker is installed with Docker compose.

## Setup

### 1.Docker

```bash
# RUN IN WSL
# Docker
docker plugin install grafana/loki-docker-driver:latest --alias loki --grant-all-permissions

```

### 2. Mkcert

Generate a certificate for local signed development
[mkcert](https://github.com/FiloSottile/mkcert)

```bash
# RUN IN WINDOWS
choco install mkcert
mkcert -install
mkcert pethero.test "*.pethero.test" localhost 127.0.0.1 ::1
```

Certs will be placed in C:/Users/YOUR_USERNAME

- pethero.test+4.pem
- pethero.test+4-key.pem

Copy both cert to your wsl env

```bash
#RUN IN WSL with SUDO
sudo mkdir /certs
sudo cp /mnt/c/Users/YOUR_USERNAME/pethero.test+4.pem /certs/pethero.test.crt
sudo cp /mnt/c/Users/YOUR_USERNAME/pethero.test+4-key.pem /certs/pethero.test.key
```

TLS should be enabled now!
Lets try it out in docker

```bash
docker compose -f compose-nginx-dev.yml -f docker-compose.yml -f docker-compose-dev.yml up -d
```

[Frontend](https://pethero.test/)
[Backend](https://api.pethero.test/api)
