---
title: Backend Local Setup
sidebar_position: 3
---

:::info Draft
Marked as draft until the backend code and env samples are finalized. Remove this banner when the repo ships with `.env.example` and a working schema.
:::

# Run the Backend Locally

Step-by-step commands to bring up the NestJS API with Prisma in a local environment.

## Prerequisites

- Node.js 18+
- PostgreSQL running locally (or via Docker)
- `npm` available

Optional: Use Docker Compose in `transcriptor-ai-api/docker-compose.yml` to start Postgres.

```bash
cd /Volumes/DEV-FILES/DEVELOPER/PERSONAL-PROJECTS/LETSGO/LIVE-TRANSLATION/transcriptor-ai-api
docker-compose up -d
```

## 1) Configure Environment

Create `.env` with your database URL and JWT secrets.

```bash
cd /Volumes/DEV-FILES/DEVELOPER/PERSONAL-PROJECTS/LETSGO/LIVE-TRANSLATION/transcriptor-ai-api
cat > .env <<'EOF'
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/live_translation?schema=public"
JWT_ACCESS_SECRET="change-me"
JWT_REFRESH_SECRET="change-me-refresh"
JWT_ACCESS_TTL="900s"
JWT_REFRESH_TTL="30d"
EOF
```

## 2) Install Dependencies

```bash
npm install
```

## 3) Generate Prisma Client

```bash
npx prisma generate
```

## 4) Apply Schema to the Database

Recommended (creates migration history):

```bash
npx prisma migrate dev --name init
```

Alternative (no migration history, for quick prototyping only):

```bash
npx prisma db push
```

## 5) Inspect Data (Optional)

```bash
npx prisma studio
```

## 6) Run the API

```bash
npm run start:dev
```

The server listens on `http://localhost:3000` by default.

## Notes

- Update the Prisma schema before running migrations if you add models (users, user_settings, refresh_tokens, etc.).
- Never commit real `.env` files or secrets; keep only sanitized `.env.example` in the repo.
