# microservices/order-service/Dockerfile

# --- Stage 1: Build ---
FROM node:18-alpine AS builder
WORKDIR /app

COPY package*.json ./
COPY tsconfig.json ./

RUN npm install

COPY src ./src

# TypeScript derlemesi (Varsa)
RUN npm run build 2>/dev/null || :

# --- Stage 2: Production ---
FROM node:18-alpine
WORKDIR /app

COPY --from=builder /app/package*.json ./
RUN npm install --production

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/src ./src
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 50052

CMD ["npm", "start"]
