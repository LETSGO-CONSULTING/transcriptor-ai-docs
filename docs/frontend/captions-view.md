---
title: Captions View
sidebar_position: 4
---

# Captions View

The **Captions View** is the primary interface of the application, designed to be a non-intrusive overlay that displays real-time transcriptions. It is loaded by default when the application starts.

## Component: `CaptionsComponent`

The `CaptionsComponent` is responsible for rendering the transcription text and providing basic controls to the user.

### Key Features

1.  **Real-time Display**: It maintains a list of caption lines (`captions`) and updates the view as new transcriptions arrive.
2.  **Auto-Scrolling**: It automatically scrolls to the bottom of the list to show the latest text. This feature is temporarily disabled when the user manually scrolls up to read previous lines, and re-enabled after a few seconds of inactivity.
3.  **Overlay Controls**: It provides a set of controls that appear when the user hovers over the window. These controls include:
    *   **Settings**: Opens the settings window via the Electron bridge (`window.electronAPI.openSettings()`).
    *   **Close**: Closes the application window.
    *   **Language Swap**: Allows the user to quickly swap the source and target languages.
4.  **Memory Management**: It limits the number of stored caption lines (`maxTotalLines`) to prevent memory issues during long sessions.

### Interaction with Electron

The component interacts with the Electron Main Process through the exposed `electronAPI`. Specifically, the `openSettings()` method calls `window.electronAPI.openSettings()`, which sends an IPC message to the main process to open the settings window.

This view is designed to be lightweight and transparent, ensuring that it doesn't obstruct the user's workflow while providing essential information.
