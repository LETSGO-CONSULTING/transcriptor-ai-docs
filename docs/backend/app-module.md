---
title: App Module
sidebar_position: 0
---

# App Module

The **App Module** is the root module of the backend application. It serves as the central entry point for the NestJS application, responsible for bootstrapping the system and orchestrating all other feature modules.

## Responsibilities

The primary responsibilities of the App Module include:

1.  **Bootstrapping**: It is the first module loaded when the application starts, initializing the dependency injection container.
2.  **Global Configuration**: It sets up global configurations that are accessible throughout the entire application, such as environment variables and security settings.
3.  **Module Aggregation**: It imports and connects all the distinct feature modules (like Auth, Audio, Transcription) to ensure they function together as a cohesive system.

## Global Configurations

The App Module configures several critical global services:

*   **Environment Configuration**: It loads environment variables (from `.env` files) to manage sensitive data like database credentials and API keys. This ensures that configuration is separated from the code.
*   **JWT Authentication**: It configures the JSON Web Token (JWT) strategy globally. This setup defines how access tokens are signed and verified, including setting the secret keys and expiration times based on the environment configuration.

## Integrated Feature Modules

The App Module acts as the container for the application's business logic by importing the following feature modules:

*   **Auth Module**: Handles user registration, login, and authentication flows.
*   **Account Module**: Manages user accounts, including payments and subscription details.
*   **Audio Module**: Controls audio settings and device management for the user.
*   **Transcription Module**: Provides the core real-time transcription and translation services via WebSockets.
*   **Preferences Module**: Manages user interface preferences like themes and font sizes.
*   **Language Module**: Handles supported languages for transcription and translation.
*   **Settings Module**: Manages general application settings.
*   **Support Module**: Provides functionality for user support and help.
*   **Prisma Module**: Connects the application to the database using the Prisma ORM.

By centralizing these imports, the App Module ensures that all parts of the application have access to the necessary services and database connections they need to operate.
