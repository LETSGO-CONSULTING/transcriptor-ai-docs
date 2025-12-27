---
title: Angular Application
sidebar_position: 3
---

# Angular Application

The Angular application is the user interface of the Live Translation Desktop app. It is built as a standalone application that runs inside the Electron renderer process.

## Root Component (`AppComponent`)

The `AppComponent` is the root component of the application. It serves as the container for the application's views and handles global application logic, such as theme management.

### Responsibilities

1.  **Routing Container**: It uses `<router-outlet>` to render the active view based on the current URL.
2.  **Theme Synchronization**: It listens to the user's authentication state and automatically applies their preferred theme (e.g., dark mode) when they log in. If the user logs out, it resets the theme to the default light mode.

## Routing (`app.routes.ts`)

The application uses the Angular Router to navigate between different views. The routes are defined in `app.routes.ts` and use lazy loading to improve performance.

### Main Routes

*   **`/captions`**: The default route. It loads the `Captions` module, which is responsible for displaying the real-time transcription overlay.
*   **`/settings`**: Loads the `Settings` module, which provides the user interface for configuring the application, managing the account, and changing preferences.
*   **`/transcription`**: A protected route that loads the `TranscriptionComponent`. This route is guarded by the `AuthGuard`, ensuring that only authenticated users can access it.

### Redirects

*   **`/`**: Redirects to `/captions`.
*   **`**`**: A wildcard route that redirects any unknown paths to `/captions`.

This routing structure allows for a clear separation between the main transcription view and the settings interface, which are displayed in separate Electron windows.
