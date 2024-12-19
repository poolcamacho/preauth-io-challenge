# Base image: Node.js (última versión estable LTS)
FROM node:18

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to install dependencies
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the source code to the container
COPY . .

# Run test (opcional)
RUN npm run test

# Default command to execute the program
CMD ["node", "src/index.js"]