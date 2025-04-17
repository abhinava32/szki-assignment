# Build stage
FROM node:18-alpine AS builder

WORKDIR /frontend

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Production stage
FROM node:18-alpine AS runner

WORKDIR /frontend

# Copy necessary files from builder
COPY --from=builder /frontend/next.config.ts ./
COPY --from=builder /frontend/public ./public
COPY --from=builder /frontend/.next ./.next
COPY --from=builder /frontend/node_modules ./node_modules
COPY --from=builder /frontend/package.json ./package.json

# Expose port
EXPOSE 3000

# Start the application
CMD ["npm", "start"] 