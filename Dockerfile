FROM node:20 AS builder
WORKDIR /app
COPY backend/package*.json ./
RUN npm ci
COPY backend/ .
RUN npm run build

FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY backend/package*.json ./
RUN npm ci --omit=dev
CMD ["node", "dist/src/main.js"]