---
title: Architecture
sidebar_position: 1
---

# Frontend Architecture

The frontend of the Live Translation application is built using a hybrid approach, combining the power of **Electron** for desktop integration with the flexibility of **Angular** for the user interface. This architecture allows us to create a cross-platform desktop application using web technologies.

## High-Level Overview

The application is structured into two distinct layers:

1.  **Electron (The Shell)**: Acts as the container for the application. It handles window management, system tray integration, and access to native operating system features like audio devices and file systems.
2.  **Angular (The UI)**: Runs inside the Electron window as a standard Single Page Application (SPA). It is responsible for rendering the user interface, managing application state, and communicating with the backend API.

## Process Model

Electron applications are multi-process by design. Understanding this model is key to understanding how the frontend works.

### 1. Main Process (Node.js)
The Main Process is the entry point of the application (typically `main.js` or `main.ts`). It runs in a full Node.js environment and is responsible for:
*   Creating and managing application windows (BrowserWindows).
*   Handling application lifecycle events (startup, shutdown, backgrounding).
*   Interacting with the operating system (menus, tray icons, global shortcuts).
*   Communicating with the Renderer Process via IPC (Inter-Process Communication).

### 2. Renderer Process (Chromium)
The Renderer Process is where the Angular application lives. It runs in a Chromium environment, similar to a web browser tab. Its responsibilities include:
*   Rendering the HTML, CSS, and components of the UI.
*   Handling user interactions (clicks, inputs).
*   Making HTTP requests to the backend API.
*   Establishing WebSocket connections for real-time transcription.

## Communication (IPC)

Since the Main and Renderer processes run in isolation, they need a way to communicate. We use Electron's **IPC (Inter-Process Communication)** mechanism for this.

*   **Renderer to Main**: The Angular app can send messages to the Main process to request native actions, such as "minimize window" or "open external link".
*   **Main to Renderer**: The Main process can send messages to the Angular app to trigger UI updates, such as "update available" or "system audio device changed".

This separation of concerns ensures that the UI remains responsive while heavy or system-level tasks are handled by the Main process.
