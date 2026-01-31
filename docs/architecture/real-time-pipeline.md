---
title: Real-Time Pipeline
sidebar_position: 3
---

:::info Draft
Marked as draft while the streaming path is being implemented. Remove this banner once the code matches the guide.
:::

# Real-Time Streaming Pipeline

This page describes the end-to-end audio streaming flow used by the Live Translation app to minimize latency while keeping quality and reliability.

## End-to-End Flow

1. **Capture**: Microphone and (optionally) system audio captured via `MediaDevices.getUserMedia` in the renderer process.
2. **Process**: AudioWorklet downsamples to 16 kHz, mono, 16-bit PCM. Chunks are grouped into 20–40 ms frames.
3. **Transport**: Frames are sent over a persistent Socket.io connection with backpressure protection and heartbeats.
4. **STT/TTS Engine**: Backend forwards frames to Azure/AWS SDK streaming APIs, handling partial and final hypotheses.
5. **Delivery**: Backend emits `transcriptionUpdate` (partial/final) and `streamError` events to the client. Overlay updates immediately.

### Text Diagram
```
Input (mic/system)
   ↓ capture (Renderer)
AudioWorklet (16 kHz mono PCM, 20–40 ms frames)
   ↓ WebSocket (Socket.io)
Backend Gateway (NestJS)
   ↓ Azure/AWS streaming SDK
STT/Translation responses (partial/final)
   ↓ WebSocket events
Captions overlay (Renderer)
```

## Latency Budget

- **Partial updates**: < 300 ms target.
- **Final updates**: < 1.5 s target.
- Keep client frame size small (20–40 ms) and avoid buffering > 3 frames before send.
- Prefer binary payloads; avoid base64 unless required.

## Audio Format

- Sample rate: 16 kHz (Azure default for telephony-quality STT).
- Channels: Mono.
- Encoding: Signed 16-bit PCM (little endian).
- Frame duration: 20–40 ms (320–640 samples per frame).

## Backpressure and Reliability

- Drop oldest frames when socket buffer grows beyond N frames (e.g., 10) to avoid runaway latency.
- Heartbeat/keepalive every 15–30 s; auto-reconnect with jitter.
- On reconnect, re-send session metadata (languages, auth token) and restart the stream.
- Surface recoverable errors to the UI; auto-retry once, then prompt the user.

## Error Handling

- Client: Stop recording on `streamError`, show retry CTA, and log details (non-PII).
- Server: Wrap SDK errors with stable codes (`AZURE_STREAM_FAILED`, `UNAUTHORIZED`, `RATE_LIMITED`), and emit `streamError`.
- Guard backend routes with JWT (access token) and validate payload sizes to prevent abuse.

## Security

- Enforce TLS (wss/https) in production.
- Require JWT on WebSocket handshake; reject unauthenticated connections.
- Do not persist raw audio; process in-memory only.
- Rate limit connection attempts per user/IP.

## Instrumentation

- Measure: time from frame send → partial → final; socket reconnect counts; dropped frame counts.
- Emit structured logs with correlation IDs per session; tie to user_id where available.
