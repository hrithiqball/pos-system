FROM node:20-alpine as builder

WORKDIR /app

RUN corepack enable

COPY package.json ./
# COPY pnpm-lock.yaml ./

RUN pnpm install
RUN pnpm build

FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 5173

COPY ./nginx.conf /etc/nginx/conf.d/default.conf

CMD ["nginx", "-g", "daemon off;"]