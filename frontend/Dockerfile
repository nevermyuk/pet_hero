
# ==== CONFIGURE =====
# Use a Node 16 base image
FROM node:16-alpine 
# Set the working directory to /app inside the container
WORKDIR /app
RUN chown -R node:node /app

# Copy app files
COPY --chown=node:node package.json .

# ==== BUILD =====
# Install dependencies (npm ci makes sure the exact versions in the lockfile gets installed)
RUN npm install

COPY --chown=node:node . .


USER node

# Expose the port on which the app will be running (3000 is the default that `serve` uses)
EXPOSE 3000

# Start the app
CMD ["npm", "run", "start"]