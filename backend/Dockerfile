###################
# BUILD FOR LOCAL DEVELOPMENT
###################

FROM node:16-alpine As development

EXPOSE 5555

RUN mkdir /app && chown -R node:node /app

USER node

COPY package.json package-lock.json /app/

RUN cd /app && npm install

WORKDIR /app

COPY --chown=node:node . /app

###################
# BUILD FOR PRODUCTION
###################

FROM node:16-alpine As build

RUN mkdir /app && chown -R node:node /app

USER node

COPY package.json package-lock.json /app/


WORKDIR /app

COPY --chown=node:node --from=development /app/node_modules ./node_modules

COPY --chown=node:node . .

RUN npm run build

USER node


ENV NODE_ENV production

RUN npm ci --only=production && npm cache clean --force

###################
# PRODUCTION
###################

FROM node:16-alpine As production

# Copy the bundled code from the build stage to the production image
COPY --chown=node:node --from=build /app/node_modules ./node_modules
COPY --chown=node:node --from=build /app/dist ./dist

# Start the server using the production build
CMD [ "node", "dist/main.js" ]

