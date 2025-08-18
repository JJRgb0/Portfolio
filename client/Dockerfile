#syntax=docker/dockerfile:1

FROM node:22.18.0-bullseye-slim

WORKDIR /usr/src/client

RUN addgroup --system appgroup && adduser --system --ingroup appgroup appuser

COPY package*.json ./

RUN --mount=type=cache,target=/usr/src/client/.npm \
    npm set cache /usr/src/client/.npm && \
    npm ci

COPY . .

RUN chown -R appuser:appgroup /usr/src/client

USER appuser

EXPOSE 5173

ENV VITE_HOST=0.0.0.0

CMD ["npm", "run", "dev"]