---
title: Transcription Service
sidebar_position: 8
---

# Transcription Service

The **Transcription Service** is the core engine of the frontend application, responsible for capturing audio, processing it, and communicating with the backend to receive real-time transcriptions and translations.

## Responsibilities

1.  **WebSocket Communication**: Establishes and maintains a persistent connection with the backend using `socket.io-client`. This connection is used to stream audio data upstream and receive transcription results downstream.
2.  **Audio Capture**: Uses the browser's `MediaDevices` API (`navigator.mediaDevices.getUserMedia`) to access the user's microphone or system audio. It supports selecting specific audio input devices.
3.  **Audio Processing**: Implements an `AudioWorklet` to process raw audio data in a separate thread. This ensures that audio processing doesn't block the main UI thread, providing a smooth user experience.
4.  **Data Streaming**: Continuously sends chunks of processed audio (PCM data) to the server via the `audioData` WebSocket event.
5.  **State Management**: Exposes RxJS `Subject`s (`transcription$` and `error$`) to allow components to subscribe to real-time updates and error notifications.

## Architecture

The service follows a streaming architecture:

1.  **Initialization**: When `startRecording` is called, the service connects to the WebSocket server and initializes the `AudioContext`.
2.  **Capture**: It captures the audio stream from the selected device.
3.  **Processing**: The audio stream is fed into an `AudioWorkletNode` (loaded from `assets/audio/audio-processor.js`). This node converts the audio into the format required by the backend (typically 16kHz, mono, PCM).
4.  **Transmission**: The `AudioWorklet` sends the processed audio buffers back to the main thread, which immediately emits them to the server.
5.  **Reception**: The server processes the audio and emits `transcriptionUpdate` events. The service listens for these events and pushes the data to the `transcription$` subject, which updates the UI.

## Usage

The `CaptionsComponent` (or any other consumer) interacts with this service to start and stop transcription.

```typescript
@Component({...})
export class CaptionsComponent {
  private transcriptionService = inject(TranscriptionService);

  ngOnInit() {
    // Subscribe to transcription updates
    this.transcriptionService.transcription$.subscribe(result => {
      this.addCaption(result.translated);
    });

    // Start recording
    this.transcriptionService.startRecording('en-US', 'es-ES');
  }

  ngOnDestroy() {
    this.transcriptionService.stopRecording();
  }
}
```

This service encapsulates all the complexity of audio handling and network communication, providing a simple API for the rest of the application.
