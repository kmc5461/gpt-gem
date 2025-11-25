# Dockerfile (Root - Next.js Web App)

# --- Stage 1: Dependencies ---
FROM node:18-alpine AS deps
WORKDIR /app
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
COPY package.json package-lock.json* ./
# Prisma schema kopyalama (postinstall generate için gerekebilir)
COPY prisma ./prisma/
RUN npm ci

# --- Stage 2: Builder ---
FROM node:18-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Environment variables that are required during build time
ENV NEXT_TELEMETRY_DISABLED 1
# Prisma client generate
RUN npx prisma generate
RUN npm run build

# --- Stage 3: Runner ---
FROM node:18-alpine AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Public klasörü ve build çıktılarını kopyala
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/prisma ./prisma

USER nextjs

EXPOSE 3000

ENV PORT 3000
# Standalone mode kullanılmıyorsa standart start komutu
CMD ["npm", "start"]
