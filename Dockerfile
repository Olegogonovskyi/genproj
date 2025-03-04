FROM node:20 AS builder
RUN apt-get update && apt-get install -y \
    python3 \
    make \
    g++
WORKDIR /app
COPY backend/package*.json ./
RUN npm ci
COPY backend/ .
RUN npm run build

FROM node:20-slim
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
RUN npm ci --omit=dev
CMD ["node", "dist/src/main.js"]