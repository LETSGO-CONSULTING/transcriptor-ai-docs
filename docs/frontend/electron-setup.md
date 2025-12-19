---
title: Electron Setup
sidebar_position: 2
---

# Electron Setup

The Electron setup is the backbone of the desktop application, responsible for creating windows, managing the application lifecycle, and providing a bridge between the operating system and the Angular frontend.

## Main Process (`main.js`)

The `main.js` file is the entry point of the Electron application. It runs in the Main Process (Node.js) and orchestrates the application's behavior.

### Responsibilities

1.  **Window Management**:
    *   **Main Window**: Creates the primary application window, which is designed to be a transparent, always-on-top overlay. This window loads the main Angular route (`/`).
    *   **Settings Window**: Creates a separate window for the settings interface, loading the `/settings` route. This window is a standard framed window.
2.  **Lifecycle Management**: Handles application startup (`app.whenReady()`) and other lifecycle events.
3.  **IPC Handling**: Listens for Inter-Process Communication (IPC) messages from the Renderer process. For example, it listens for the `open-settings` event to launch the settings window.
4.  **Google Login Handling**: Intercepts window creation requests to properly handle Google OAuth popups within the settings window.

### Key Functions

*   `createMainWindow()`: Initializes the main transparent overlay window.
*   `createSettingsWindow()`: Initializes the settings window.
*   `ipcMain.on('open-settings', ...)`: Event listener that triggers the creation or focusing of the settings window.

## Preload Script (`preload.js`)

The `preload.js` file acts as a secure bridge between the Main Process and the Renderer Process (Angular). It runs in the Renderer process but has access to Node.js APIs, which it selectively exposes to the global `window` object.

### Responsibilities

1.  **Context Isolation**: Ensures that the Renderer process runs in a separate context from the Main process, preventing malicious code from accessing internal Electron APIs.
2.  **API Exposure**: Uses `contextBridge.exposeInMainWorld` to safely expose specific functions to the Angular application.

### Exposed API

The preload script exposes the following API under the `window.electronAPI` namespace:

*   `openSettings()`: A function that sends an IPC message (`open-settings`) to the Main process, requesting it to open the settings window.

This setup ensures a secure and structured way for the Angular frontend to interact with the underlying desktop environment.
