# microservices/product-service/Dockerfile

# --- Stage 1: Build ---
FROM node:18-alpine AS builder
WORKDIR /app

# Root package.json ve lock dosyalarını kopyalamak gerekebilir ama
# mikroservis bağımsız çalışacak şekilde kendi package.json'ını kullanır.
COPY package*.json ./
COPY tsconfig.json ./

# Bağımlılıkları yükle
RUN npm install

# Kaynak kodları kopyala
COPY src ./src
# Proto dosyalarını kopyala (Root'tan erişim gerekirse context ayarı yapılmalı, şimdilik local varsayıyoruz)
# COPY ../../protos ./protos 

# TypeScript derlemesi
RUN npm run build 2>/dev/null || : # Eğer build script yoksa hata vermesin

# --- Stage 2: Production ---
FROM node:18-alpine
WORKDIR /app

COPY --from=builder /app/package*.json ./
RUN npm install --production

# Build edilmiş dosyaları veya src'yi (ts-node kullanılacaksa) kopyala
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/src ./src
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 50051

# Start komutu (package.json'daki start scriptine bağlı)
CMD ["npm", "start"]
