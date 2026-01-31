---
title: Configuration
sidebar_position: 0
---

:::info Draft
Marked as draft until the configuration files and env samples are committed. Remove this banner once the repo includes `.env.example` files.
:::

# Configuration

Use environment files to keep secrets out of the codebase. All keys and URLs should live in `.env` files that are not committed to Git.

## Backend `.env` (NestJS)

Recommended keys:

```env
DATABASE_URL=postgresql://USER:PASSWORD@localhost:5432/live_translation?schema=public

JWT_ACCESS_SECRET=change-me
JWT_REFRESH_SECRET=change-me-refresh
JWT_ACCESS_TTL=900s          # 15 minutes
JWT_REFRESH_TTL=30d

AZURE_SPEECH_KEY=your-azure-key
AZURE_SPEECH_REGION=your-azure-region

AWS_ACCESS_KEY_ID=your-aws-key
AWS_SECRET_ACCESS_KEY=your-aws-secret
AWS_REGION=us-east-1

FRONTEND_ORIGIN=http://localhost:4200
PORT=3000
```

## Desktop `.env` (Electron + Angular)

Expose only non-secret configuration to the renderer (use build-time env vars):

```env
VITE_API_BASE_URL=http://localhost:3000
VITE_WS_URL=ws://localhost:3000
VITE_DEFAULT_INPUT_LANG=en-US
VITE_DEFAULT_OUTPUT_LANG=es-ES
```

For Electron main process, prefer reading from a local `.env` (not bundled) for any native integrations that may need secrets (e.g., updater endpoints).

## Practices

- Never commit real secrets. Use `.gitignore` for `.env` files.
- Keep a sanitized `.env.example` in each project (`api`, `app`) with placeholders.
- Rotate any leaked credentials immediately (the repo currently contains a Google client secret file that should be removed and rotated).
- Validate required env vars on startup and fail fast with clear errors.

## Environment Matrix

- **Local**: Point to localhost services; relaxed CORS; verbose logging.
- **Staging**: Separate DB, Azure/AWS keys; CORS restricted to staging domains; feature flags allowed.
- **Production**: Strict CORS, TLS only, rotation of JWT secrets and provider keys, rate limiting enabled.
