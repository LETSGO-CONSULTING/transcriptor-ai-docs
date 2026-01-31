---
title: Authentication
sidebar_position: 1
---

:::info Draft
Marked as draft until the auth module is fully implemented (JWT + refresh + social + local). Remove this banner once code and docs align.
:::

# Authentication

This guide documents the planned authentication flows: local email/password, Google/Apple OAuth, JWT access/refresh tokens, and profile management.

## Token Strategy

- **Access token**: Short-lived JWT (e.g., 15 minutes), carried in `Authorization: Bearer <token>` for API and WebSocket handshake.
- **Refresh token**: Long-lived JWT (e.g., 30 days), stored server-side hashed in `refresh_tokens` and rotated on each refresh.
- **Rotation**: Every refresh issues new access + refresh tokens and revokes the previous refresh token.

## Flows

### Register (Local)
- Endpoint: `POST /auth/register`
- Input: `email`, `password`, `name`
- Output: `accessToken`, `refreshToken`, `user`
- Behavior: Hash password, create user + settings row, seed defaults (languages, theme, font).

### Login (Local)
- Endpoint: `POST /auth/login`
- Input: `email`, `password`, `remember?`
- Output: `accessToken`, `refreshToken`, `user`
- Behavior: Verify password, issue tokens; `remember` may extend refresh TTL.

### Google / Apple
- Endpoint: `POST /auth/google`, `POST /auth/apple`
- Input: provider ID token (and nonce for Apple)
- Behavior: Verify token with provider, upsert user, upsert `user_identities`, issue JWT pair.

### Refresh
- Endpoint: `POST /auth/refresh`
- Input: `refreshToken`
- Output: new JWT pair
- Behavior: Validate token, check against hashed store, rotate and revoke old token.

### Logout
- Endpoint: `POST /auth/logout`
- Input: `refreshToken`, `allDevices?`
- Behavior: Revoke the provided token or all tokens for the user.

### Profile
- Endpoint: `GET /auth/profile` (requires access token)
- Endpoint: `PATCH /auth/profile` with multipart form (`name`, `avatar`)
- Endpoint: `PATCH /auth/password` (old + new password)

## Guards and Security

- Apply `JwtAuthGuard` to protected routes (profile, settings, audio, account).
- Enforce CORS and Helmet; set strict `origin` list.
- Rate-limit login and refresh endpoints to mitigate brute force and token abuse.
- Validate payload sizes (especially avatars) and MIME types.

## WebSocket Handshake

- Require `Authorization: Bearer <accessToken>` on connection.
- Reject if token is missing/expired; instruct client to refresh before reconnecting.

## Data Model (Prisma)

Key tables to support the flows:
- `users` (email, password hash, name, picture, is_email_verified, last_login_provider)
- `refresh_tokens` (user_id, token_hash, expires_at, revoked_at)
- `user_identities` (provider, provider_user_id, user_id, raw_profile)
- `user_settings` (theme, font, languages, audio device selections)
