---
title: Language Module
sidebar_position: 6
---

# Language Module

The **Language Module** is responsible for managing the languages available for transcription and translation within the application. It provides a centralized way to retrieve the list of supported languages, which can then be displayed to the user in the frontend.

## Responsibilities

The primary responsibilities of the Language Module include:

1.  **Providing Language Data**: It exposes an API endpoint that returns a list of all supported languages, including their names and codes (e.g., "English", "en-US").
2.  **Centralizing Language Management**: It acts as the single source of truth for language support, ensuring that both the frontend and backend are working with the same set of languages.

## Architecture

The module is composed of a controller and a service:

*   **`LanguageController`**: Exposes an API endpoint (e.g., `GET /languages`) that allows clients to fetch the list of supported languages.
*   **`LanguageService`**: Contains the logic for retrieving the language data. This might involve fetching the data from a static configuration file, a database, or directly from the Azure Speech Service.

By encapsulating language management in its own module, the application can easily update or expand its language support without affecting other parts of the system. This also makes it simple for the frontend to dynamically populate language selection dropdowns.
