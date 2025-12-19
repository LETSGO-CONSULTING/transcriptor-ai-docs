---
title: Auth Facade
sidebar_position: 6
---

# Auth Facade

The **Auth Facade** is a key architectural component that serves as the single point of entry for all authentication-related operations in the frontend. It abstracts the complexity of API calls and state management, providing a clean and reactive interface for the rest of the application.

## Responsibilities

1.  **State Management**: It holds the current authentication state using Angular Signals.
    *   `token`: Stores the JWT access token.
    *   `user`: Stores the current user's profile information.
2.  **API Abstraction**: It wraps the methods of the `AuthApi` service, handling the side effects of successful operations (like updating the local state and local storage).
3.  **Session Persistence**: It manages the storage of the access token in `localStorage` to persist the user's session across page reloads.

## Key Methods

*   **`login(email, password)`**: Authenticates the user with email and password. On success, it updates the `token` and `user` signals.
*   **`googleLogin(idToken)`**: Authenticates the user using a Google ID token.
*   **`logout()`**: Logs the user out by clearing the local state and calling the logout API endpoint.
*   **`updateProfile(data)`**: Updates the user's profile (name, avatar) and reactively updates the `user` signal with the new data.
*   **`updateAudioSettings(...)`**: Updates the user's audio preferences.
*   **`updateLanguageSettings(...)`**: Updates the user's language preferences and synchronizes the local user state.

## Usage

Components can inject the `AuthFacade` to access the current user or perform authentication actions without needing to know the details of the underlying API or storage mechanisms.

```typescript
@Component({...})
export class UserProfileComponent {
  private auth = inject(AuthFacade);
  
  // Accessing the user signal
  user = this.auth.user; 

  logout() {
    this.auth.logout().subscribe();
  }
}
```

This pattern promotes a clean separation of concerns and makes the application easier to test and maintain.
