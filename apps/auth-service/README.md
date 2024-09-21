Migrations by Prisma

```bash
pnpm --filter @app/auth-service prisma migrate dev --name init
```

Generate Prisma Client

```bash
pnpm --filter @app/auth-service prisma generate
```

Secret Key

1. Generate secret key

```bash
openssl rand -base64 12
```
2. Copy the generated key and paste it in the .env file

```bash
SECRET_KEY=your_secret_key
```

Secure Certificate

1. Generate a self-signed certificate

```bash
openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -days 365 -nodes
```

2. Copy or move the generated key and certificate to the root of the project

```bash
mv key.pem cert.pem apps/auth-service
```

