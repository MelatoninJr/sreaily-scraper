# Use the node:current-alpine image as the base image
FROM node:current-alpine

# Install curl, wget, and Chromium
RUN apk --no-cache add curl wget chromium

# Set environment variables for Puppeteer
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser

# Set the working directory in the container
WORKDIR /server

# Copy the package.json and package-lock.json to the container
COPY package*.json ./

# Install the application's dependencies inside the container
RUN npm ci

# Copy the rest of the application to the container
COPY . .

# Specify the port the app runs on
EXPOSE 3001

# Specify the command to run when the container starts
CMD ["npx", "ts-node", "server.ts"]
