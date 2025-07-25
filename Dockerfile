FROM node:20-alpine

WORKDIR /app

COPY package.json package-lock.json* ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Expose Next.js default port
EXPOSE 3000

# Start Next.js in development mode
CMD ["npm", "run", "dev"]
