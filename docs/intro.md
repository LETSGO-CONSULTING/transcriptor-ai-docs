---
id: introduction
title: Live Translation App
sidebar_label: Introduction
---

# Live Translation – Real-time Speech Transcription & Translation

**Live Translation** is a cross-platform desktop application that breaks language barriers in real-time meetings. It captures audio from microphone and system output, transcribes and translates it instantly using Azure Cognitive Services.

## Current Tech Stack

| Layer | Technology |
|---|---|
| Backend API | NestJS 11.0.1 · Node.js 20 · TypeScript 5.7 |
| Desktop App | Electron 28.3.3 · Angular 19.2 · Angular Material 19 |
| Landing Site | React 19.2 · Vite (rolldown) · Tailwind CSS 3 |
| Database | PostgreSQL · Prisma ORM 6.16.2 |
| Cache / Queue | Redis (Upstash) · ioredis 5.9.2 |
| Real-time | Socket.IO 4.x (NestJS WebSocket gateway) |
| Speech / AI | Microsoft Azure Cognitive Services Speech SDK 1.47.0 |
| Payments | Stripe 16.6 · PayPal · Culqi |
| Auth | JWT (argon2) · Google OAuth 2.0 (web + desktop clients) |
| Email | AWS SES (@aws-sdk/client-ses) |
| API Docs | Swagger (@nestjs/swagger 11.2) |

## Core Principles

- **Real-time first** — WebSockets + optimized audio streams. Latency is the enemy.
- **Privacy focused** — audio processed in memory, never stored permanently.
- **Cross-platform** — Electron runs on Windows, macOS, Linux.
- **Cloud-powered** — Azure Cognitive Services for enterprise-grade accuracy.

## Platform Components

| Component | Tech | Port |
|-----------|------|------|
| Backend API | NestJS + Socket.IO | 4300 |
| Desktop App | Angular + Electron | — |
| Landing Site | React + Vite | 5173 (dev) |

## Quick Start

```bash
# Backend API (port 4300)
cd transcriptor-ai-api
npm run start:dev

# Desktop App
cd transcriptor-ai-app
npm run start

# Landing Site
cd transcriptor-ai-site
npm run dev
```

## Environment Variables (Backend)

```env
# Database
DATABASE_URL=postgresql://...

# Redis
REDIS_URL=rediss://...

# Azure Speech
AZURE_SPEECH_KEY=...
AZURE_SPEECH_REGION=eastus

# Auth
JWT_ACCESS_SECRET=...
JWT_REFRESH_SECRET=...
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
GOOGLE_INSTALLED_CLIENT_ID=...

# Payments
STRIPE_SECRET_KEY=sk_...
PAYPAL_CLIENT_ID=...
CULQI_PRIVATE_KEY=sk_...

# URLs
PORT=4300
FRONTEND_URL=http://localhost:4200
```
