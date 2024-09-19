Migrations by Prisma

```bash
pnpm --filter @app/auth-service dlx prisma migrate dev --name init
```

Generate Prisma Client

```bash
pnpm --filter @app/auth-service dlx prisma generate
```

Generate Secret Key

```bash
openssl rand -base64 12
```
