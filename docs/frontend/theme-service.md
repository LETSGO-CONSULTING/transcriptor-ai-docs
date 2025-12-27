---
title: Theme Service
sidebar_position: 7
---

# Theme Service

The **Theme Service** is responsible for managing the visual appearance of the application, including the color theme (light/dark), font settings, and brightness. It leverages Angular Signals to provide a reactive and efficient way to update the UI in real-time.

## Responsibilities

1.  **Theme Management**: Handles the switching between 'light', 'dark', and 'system' themes. It automatically detects the operating system's preference when in 'system' mode.
2.  **Visual Customization**: Manages other visual properties like:
    *   `fontFamily`: The font used throughout the application.
    *   `fontSizeScale`: A scaling factor for the base font size.
    *   `brightness`: A filter applied to the entire body to adjust brightness.
3.  **Persistence**: Automatically saves the user's preferences to `localStorage` so they are remembered on the next visit.
4.  **Synchronization**: Provides a method (`syncWithUserPreferences`) to update the local state with settings retrieved from the backend database when a user logs in.

## Reactive Architecture

The service uses Angular's `effect()` to automatically apply changes whenever a signal is updated.

*   **Theme Effect**: When the `theme` signal changes, an effect runs to add or remove the `dark` class from the `<html>` element. This triggers Tailwind CSS's dark mode styles.
*   **Visual Effects**: Separate effects listen to changes in `fontFamily`, `fontSizeScale`, and `brightness`, applying the corresponding CSS styles to the `<body>` or `<html>` elements.

## Usage

Components can inject the `ThemeService` to read the current settings or update them.

```typescript
@Component({...})
export class SettingsPreferencesComponent {
  private themeService = inject(ThemeService);

  // Reading signals
  currentTheme = this.themeService.theme;

  // Updating the theme
  setTheme(newTheme: ThemeType) {
    this.themeService.theme.set(newTheme);
  }
}
```

This reactive approach ensures that any change to a preference is instantly reflected across the entire application without the need for manual DOM manipulation or page reloads.
