# Use official Node.js image
FROM node:20.11.1

# Set working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy source code
COPY . .

# Expose port
EXPOSE 4000

# Run the app
CMD ["node", "server.js"]