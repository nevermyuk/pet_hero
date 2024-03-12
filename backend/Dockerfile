###################
# BUILD FOR LOCAL DEVELOPMENT
###################

FROM node:16.17.1-bullseye-slim As development

EXPOSE 5555

RUN mkdir /app && chown -R node:node /app

RUN npm i -g @nestjs/cli

COPY package.json package-lock.json /app/

WORKDIR /app

RUN npm i

COPY --chown=node:node . .

USER node


###################
# BUILD FOR PRODUCTION
###################

FROM node:16.17.1-bullseye-slim As build

RUN mkdir /app && chown -R node:node /app

USER node

COPY package.json package-lock.json /app/


WORKDIR /app

COPY --chown=node:node --from=development /app/node_modules ./node_modules

COPY --chown=node:node . .

RUN npm run build

RUN npm ci --only=production && npm cache clean --force

###################
# PRODUCTION
###################

FROM node:16.17.1-bullseye-slim As production
RUN RUN apt-get update && apt-get install -y --no-install-recommends dumb-init

ENV NODE_ENV production
WORKDIR /app

# Copy the bundled code from the build stage to the production image
COPY --chown=node:node --from=build /app/node_modules ./node_modules
COPY --chown=node:node --from=build /app/dist ./dist

USER node

# Start the server using the production build
CMD [ "dumb-init", "node", "dist/main.js" ]

