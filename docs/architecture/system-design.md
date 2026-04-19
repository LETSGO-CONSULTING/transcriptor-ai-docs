---
title: System Design
sidebar_position: 1
---

# System Design

The Live Translation App is designed to minimize latency and provide seamless real-time transcription and translation.

## High-Level Architecture

```
┌─────────────────────────────────────────────────────┐
│              Desktop App (Electron 28)               │
│                                                      │
│  Angular 19 + Angular Material                      │
│  ┌─────────────────┐  ┌──────────────────────────┐  │
│  │  Captions View  │  │     Settings View        │  │
│  │ (live subtitles)│  │ (audio, lang, appearance)│  │
│  └────────┬────────┘  └──────────────────────────┘  │
│           │                                          │
│  TranscriptionService (Socket.IO client)             │
│  AudioWorklet (PCM capture — mic + system audio)     │
└───────────┬─────────────────────────────────────────┘
            │ WebSocket (Socket.IO) — PCM audio chunks
┌───────────▼─────────────────────────────────────────┐
│              Backend API (NestJS 11, port 4300)      │
│                                                      │
│  TranscriptionGateway (Socket.IO server)             │
│  ↓                                                   │
│  Azure Speech SDK stream                             │
│  ↓                                                   │
│  Recognizing (partial) + Recognized (final) events   │
│  ↓                                                   │
│  Emits back to client via WebSocket                  │
│                                                      │
│  REST API (/api) — Auth, Account, Pricing, Settings  │
│                                                      │
└──────┬──────────────────┬───────────────────────────┘
       │                  │
┌──────▼──────┐  ┌────────▼────────┐
│ PostgreSQL  │  │  Redis (Upstash)│
│  (Prisma)   │  │  Cache/throttle │
└─────────────┘  └─────────────────┘
                          │
                 ┌────────▼────────┐
                 │  Azure Cognitive│
                 │  Services       │
                 │  (eastus region)│
                 └─────────────────┘
```

## Real-Time Data Flow

1. **Capture** — `AudioWorklet` captures audio in small PCM chunks (mic + system)
2. **Send** — each chunk sent immediately via persistent Socket.IO WebSocket
3. **Process** — backend pushes chunks to Azure Speech SDK stream (no disk write)
4. **Response** — Azure emits `Recognizing` (partial) and `Recognized` (final) events
5. **Deliver** — backend forwards events to frontend → UI updates subtitles instantly

## Main Components

### Backend (NestJS 11)

| Module | Responsibility |
|--------|---------------|
| `transcription` | Core — WebSocket gateway + Azure Speech SDK integration |
| `audio` | Audio device management |
| `auth` | JWT auth, Google OAuth (web + installed), password reset |
| `account` | User account, subscriptions, billing |
| `pricing` | Plans, top-ups, usage tracking |
| `language` | Supported STT + translation languages |
| `redis` | Redis client, throttler storage |
| `settings` | User preferences |
| `preferences` | Audio/language preferences |
| `security` | Guards, rate limiting |
| `dashboard` | Usage analytics |
| `admin` | Admin operations |
| `support` | Help/support |
| `common` | Shared guards, interceptors, logging |
| `config` | App configuration |

### Desktop App (Electron 28 + Angular 19)

| Service | Responsibility |
|---------|---------------|
| `TranscriptionService` | Socket.IO connection, audio streaming, results handling |
| `AuthFacade` | JWT token management, user state |
| `ThemeService` | Light/dark mode |
| `I18nService` | EN/ES translations |
| `AudioCapturePreferencesService` | Audio device selection |
| `CaptionsAppearanceService` | Subtitle styling and positioning |

### Landing Site (React 19 + Vite)

Pages: Hero · Features · Pricing · Documentation · Account · Legal (Terms + Privacy)

## Technology Decisions

| Decision | Choice | Reason |
|----------|--------|--------|
| Real-time protocol | Socket.IO | Bidirectional, works through firewalls |
| Speech engine | Azure Cognitive Services | Best accuracy + translation in one SDK |
| Desktop | Electron | Cross-platform, native audio access |
| Cache | Redis (Upstash) | Throttling + session data, serverless-friendly |
| ORM | Prisma 6 | Type-safe, clean migrations |
| Auth | Stateless JWT + argon2 | Scalable, no session storage |
| Payments | Stripe + PayPal + Culqi | Multi-market: global + Peru |
