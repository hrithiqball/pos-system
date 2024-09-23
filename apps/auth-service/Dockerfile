FROM node:20-alpine AS base

FROM base AS builder

RUN apk add --no-cache gcompat
WORKDIR /app

RUN npm install -g pnpm

COPY ./pnpm-lock.yaml ./
COPY ./apps/auth-service/package.json ./
COPY ./apps/auth-service/tsconfig.json ./
COPY ./apps/auth-service/src ./src

RUN pnpm install --no-frozen-lockfile --production
# RUN pnpm install --frozen-lockfile --production
RUN pnpm run build

# RUN npm ci && \
#     npm run build && \
#     npm prune --production

FROM base AS runner
WORKDIR /app

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 hono

COPY --from=builder --chown=hono:nodejs /app/node_modules /app/node_modules
COPY --from=builder --chown=hono:nodejs /app/dist /app/dist
COPY --from=builder --chown=hono:nodejs /app/package.json /app/package.json

USER hono
EXPOSE 3003

CMD ["node", "/app/dist/index.js"]