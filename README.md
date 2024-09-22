# POS System

Features

- LHDN Tax Invoice
- Inventory Management
- User Management
- Role Management

Prerequisites

- Node 20+
- Fast Node Manager (fnm)
- unix-like OS (Linux, MacOS)
- corepack
- postgresql
- docker

Installation

```bash
corepack enable
pnpm install
```

Adding ShadCN UI

```bash
pnpm add ui {name}
```

Running Development Server

```bash
docker compose -f docker-compose.local.yml up -d
pnpm dev
```
