---
title: Database Schema
sidebar_position: 1
---

# Database Schema

The application uses **PostgreSQL** as its relational database, managed via **Prisma ORM**. Below is a detailed description of the data models and their relationships.

## Users (`users`)

The core entity of the application. It stores the user's personal information and authentication details.

| Field | Type | Description |
| :--- | :--- | :--- |
| `id` | UUID | Unique identifier for the user. |
| `email` | String | User's email address (Unique). |
| `password` | String? | Hashed password (nullable for social logins). |
| `name` | String? | User's full name. |
| `picture` | String? | URL to the user's avatar. |
| `is_email_verified` | Boolean | Whether the user's email has been verified. |
| `last_login_provider` | String? | The provider used for the last login (e.g., 'google', 'local'). |
| `openpayCustomerId` | String? | ID for the user in the OpenPay payment gateway. |
| `created_at` | DateTime | Timestamp of account creation. |
| `updated_at` | DateTime | Timestamp of the last update. |

**Relationships:**
*   **`settings`**: One-to-One relation with `user_settings`.
*   **`cards`**: One-to-Many relation with `cards`.
*   **`refresh_tokens`**: One-to-Many relation with `refresh_tokens`.
*   **`user_identities`**: One-to-Many relation with `user_identities`.

## User Settings (`user_settings`)

Stores the user's preferences for the application, including audio devices, languages, and visual themes.

| Field | Type | Description |
| :--- | :--- | :--- |
| `id` | String | Unique identifier. |
| `user_id` | UUID | Foreign key to the `users` table. |
| `selected_audio_input_id` | String? | ID of the preferred microphone. |
| `selected_audio_output_id` | String? | ID of the preferred speaker. |
| `selected_input_language_code` | String? | Code of the preferred input language (e.g., 'en-US'). |
| `selected_output_language_code` | String? | Code of the preferred output language (e.g., 'es-ES'). |
| `theme` | String | Visual theme ('light', 'dark', 'system'). Default: 'system'. |
| `font_family` | String | Preferred font family. Default: 'Inter'. |
| `font_size_scale` | Float | Font size scaling factor. Default: 1.0. |
| `brightness` | Float | Screen brightness level. Default: 1.0. |

## Payment Cards (`cards`)

Stores the user's saved payment methods (credit/debit cards) for subscriptions.

| Field | Type | Description |
| :--- | :--- | :--- |
| `id` | String | Unique identifier. |
| `userId` | UUID | Foreign key to the `users` table. |
| `openpayCardId` | String | ID of the card in OpenPay. |
| `brand` | String? | Card brand (e.g., 'visa', 'mastercard'). |
| `last4` | String? | Last 4 digits of the card number. |
| `isActive` | Boolean | Whether this is the default card for payments. |

## Refresh Tokens (`refresh_tokens`)

Used for maintaining persistent user sessions securely.

| Field | Type | Description |
| :--- | :--- | :--- |
| `id` | BigInt | Unique identifier. |
| `user_id` | UUID | Foreign key to the `users` table. |
| `token_hash` | String | Hashed version of the refresh token. |
| `expires_at` | DateTime | Expiration date of the token. |
| `revoked_at` | DateTime? | Timestamp when the token was revoked (if applicable). |

## User Identities (`user_identities`)

Stores linked social accounts (e.g., Google, Apple) for a user.

| Field | Type | Description |
| :--- | :--- | :--- |
| `id` | BigInt | Unique identifier. |
| `user_id` | UUID | Foreign key to the `users` table. |
| `provider` | String | Name of the provider (e.g., 'google'). |
| `provider_user_id` | String | Unique ID of the user within that provider. |
| `raw_profile` | Json? | Raw profile data returned by the provider. |
