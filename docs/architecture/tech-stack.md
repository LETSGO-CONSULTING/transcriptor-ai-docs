---
title: Tech Stack
sidebar_position: 2
---

# Tech Stack

## Backend API — transcriptor-ai-api

| Technology | Version | Purpose |
|-----------|---------|---------|
| **NestJS** | 11.0.1 | Main API framework |
| **Node.js** | 20.x | Runtime |
| **TypeScript** | 5.7.3 | Language |
| **Prisma ORM** | 6.16.2 | Database access (PostgreSQL) |
| **Socket.IO** | 4.x (NestJS 11.1.9) | WebSocket gateway for real-time transcription |
| **ioredis** | 5.9.2 | Redis client (cache + throttler) |
| **Azure Speech SDK** | 1.47.0 | Speech-to-text + translation |
| **Stripe** | 16.6.0 | Subscription payments |
| **argon2** | 0.44.0 | Password hashing |
| **@nestjs/jwt** | 11.0.0 | JWT auth |
| **google-auth-library** | 9.14.2 | Google OAuth 2.0 |
| **@aws-sdk/client-ses** | 3.1000.0 | Transactional email |
| **@nestjs/swagger** | 11.2.0 | API docs at /api/docs |
| **@nestjs/throttler** | 6.5.0 | Rate limiting |

## Desktop App — transcriptor-ai-app

| Technology | Version | Purpose |
|-----------|---------|---------|
| **Electron** | 28.3.3 | Desktop shell + native audio access |
| **Angular** | 19.2.0 | UI framework |
| **Angular Material** | 19.2.11 | UI components |
| **TypeScript** | 5.7.2 | Language |
| **Socket.IO client** | 4.8.1 | WebSocket connection to API |
| **Tailwind CSS** | 4.1.5 | Styling |
| **@stripe/stripe-js** | 4.8.0 | Payment UI |
| **electron-builder** | 26.0.12 | Packaging (.dmg, .exe) |

App ID: `com.letsgo.livetranscriptor` | Version: `2.0.1`

## Landing Site — transcriptor-ai-site

| Technology | Version | Purpose |
|-----------|---------|---------|
| **React** | 19.2.0 | UI framework |
| **Vite** (rolldown) | 7.2.5 | Build tool |
| **TypeScript** | 5.9.3 | Language |
| **Tailwind CSS** | 3.4.17 | Styling |
| **Lucide React** | 0.562.0 | Icons |

## Infrastructure

| Service | Provider | Notes |
|---------|---------|-------|
| Database | Neon PostgreSQL (us-east-1) | Serverless |
| Cache | Redis — Upstash | Throttling + sessions |
| Speech AI | Azure Cognitive Services | eastus region |
| Email | AWS SES | Transactional |
| Payments | Stripe + PayPal + Culqi | Global + Peru market |
| Auth | Google OAuth 2.0 | Web + installed app clients |
