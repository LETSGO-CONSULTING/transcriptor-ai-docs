---
title: Settings View
sidebar_position: 5
---

# Settings View

The **Settings View** provides a comprehensive interface for users to configure the application, manage their account, and customize their experience. It is displayed in a separate, framed window, distinct from the main captions overlay.

## Component: `SettingsComponent`

The `SettingsComponent` acts as the main shell for the settings interface. It provides the navigation menu and a container for rendering the selected settings section.

### Responsibilities

1.  **Navigation**: It displays a sidebar or menu that allows users to switch between different configuration categories (Account, Audio, Languages, Preferences).
2.  **Section Management**: It tracks the currently active section (`currentSection`) and updates the view accordingly.
3.  **Theme Integration**: It injects the `ThemeService` to ensure the settings window respects the user's visual preferences (e.g., dark mode).

## Routing Structure

The settings view utilizes Angular's child routes to manage the different configuration panels. This structure is defined in `settings.routes.ts`.

### Sections

*   **Account (`/settings/account`)**:
    *   Manages user authentication (Sign In, Sign Up).
    *   Displays the user profile and subscription details.
    *   Handles payment methods (`/cards`).
    *   Includes guards (`AuthGuard`, `GuestGuard`) to protect sensitive routes.
*   **Audio (`/settings/audio`)**:
    *   Loads the `SettingsAudioComponent`.
    *   Allows users to select input/output devices and adjust volume levels.
*   **Languages (`/settings/languages`)**:
    *   Loads the `SettingsLanguagesComponent`.
    *   Enables users to manage supported languages for transcription and translation.
*   **Preferences (`/settings/preferences`)**:
    *   Loads the `SettingsPreferencesComponent`.
    *   Provides options for visual customization, such as themes, font sizes, and brightness.

This modular routing approach ensures that each settings category is self-contained and loaded only when needed, keeping the application performant and organized.
