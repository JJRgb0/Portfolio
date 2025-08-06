#syntax=docker/dockerfile:1

# Build
FROM node:22.18.0-bullseye-slim AS builder

WORKDIR /usr/src/client

COPY package*.json ./

RUN --mount=type=cache,target=/usr/src/client/.npm \
    npm set cache /usr/src/client/.npm && \
    npm ci

COPY . .

RUN npm run build

# Runtime
FROM nginxinc/nginx-unprivileged:1.28.0-alpine

COPY  nginx.conf etc/nginx/conf.d/default.conf

COPY --from=builder /usr/src/client/dist /usr/share/nginx/html

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]