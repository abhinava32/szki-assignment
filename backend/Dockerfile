# Build stage
FROM node:18-alpine as builder

WORKDIR /backend

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Production stage
FROM node:18-alpine

WORKDIR /backend

# Copy package files
COPY package*.json ./

# Install production dependencies only
RUN npm install --production

# Copy built files from builder stage
COPY --from=builder /backend/dist ./dist

# Expose the port
EXPOSE 4000

# Start the application
CMD ["npm", "start"] 