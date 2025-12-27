---
title: System Design
sidebar_position: 1
---

# System Design

The architecture of the **Live Translation App** is designed to minimize latency and provide a seamless real-time translation experience.

## High-Level Diagram

The following diagram illustrates the data flow from when the user speaks until they receive the translation.
```mermaid
graph LR
    User[User] -->|Audio (Microphone)| Electron[Frontend (Electron/Angular)]
    System[System] -->|Audio (Speakers)| Electron

    Electron -->|WebSocket (Audio Stream)| NestJS[Backend (NestJS)]
    
    NestJS -->|SDK (Stream)| Azure[Azure Cognitive Services]
    
    Azure -->|Transcribed + Translated Text| NestJS
    NestJS -->|WebSocket (Event)| Electron
    
    Electron -->|UI| User
```

## Main Components

### 1. Frontend (Desktop Client)
*   **Technology:** Electron + Angular.
*   **Responsibility:**
    *   Capture audio from the user's microphone.
    *   Capture system audio (what other participants are saying).
    *   Convert audio to 16-bit PCM format using `AudioWorklet`.
    *   Display the real-time translation on the user interface.

### 2. Backend (API Server)
*   **Technology:** NestJS + Socket.io.
*   **Responsibility:**
    *   Manage WebSocket connections from clients.
    *   Authenticate users.
    *   Act as a secure intermediary between the client and Azure.
    *   Manage meeting "Rooms".

### 3. AI Service (Translation Engine)
*   **Technology:** Azure Cognitive Services (Speech Translation).
*   **Responsibility:**
    *   Receive the audio stream.
    *   Transcribe audio to text (Speech-to-Text).
    *   Translate the text to the target language.
    *   Return partial (while speaking) and final results.

## Real-Time Data Flow

1.  **Capture:** The `AudioWorklet` in the frontend captures audio in small chunks.
2.  **Sending:** Each chunk is immediately sent to the backend through a persistent WebSocket channel.
3.  **Processing:** The backend "pushes" these chunks to the Azure SDK without storing them on disk.
4.  **Response:** Azure processes the audio and emits `Recognizing` (partial) and `Recognized` (final) events.
5.  **Delivery:** The backend forwards these events to the frontend, which updates the interface instantly.