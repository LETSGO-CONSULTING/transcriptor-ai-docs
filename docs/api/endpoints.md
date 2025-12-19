---
title: API Endpoints
sidebar_position: 3
---

# API Endpoints

This document provides a detailed overview of the API endpoints available in the Live Translation application.

## Authentication

All authentication-related endpoints are prefixed with `/auth`.

### `POST /auth/register`

Register a new user with an email, password, and name.

- **Request Body:**
  - `email` (string, required): The user's email address.
  - `password` (string, required): The user's password.
  - `name` (string, required): The user's name.
- **Response:**
  - `accessToken` (string): A JWT access token for the user.
  - `refreshToken` (string): A refresh token to obtain a new access token.
  - `user` (object): The user's profile information.

### `POST /auth/login`

Log in a user with an email and password.

- **Request Body:**
  - `email` (string, required): The user's email address.
  - `password` (string, required): The user's password.
  - `remember` (boolean, optional): Whether to keep the user logged in for 30 days.
- **Response:**
  - `accessToken` (string): A JWT access token for the user.
  - `refreshToken` (string): A refresh token to obtain a new access token.
  - `user` (object): The user's profile information.

### `POST /auth/refresh`

Obtain a new access token using a refresh token.

- **Request Body:**
  - `refreshToken` (string, required): The refresh token.
- **Response:**
  - `accessToken` (string): A new JWT access token.
  - `refreshToken` (string): A new refresh token.

### `POST /auth/logout`

Log out a user and revoke their refresh token.

- **Request Body:**
  - `allDevices` (boolean, optional): If true, all refresh tokens for the user will be revoked.
  - `refreshToken` (string, optional): The refresh token to revoke.
- **Response:**
  - `ok` (boolean): Whether the logout was successful.

### `POST /auth/google`

Log in or register a user with a Google ID token.

- **Request Body:**
  - `idToken` (string, required): The Google ID token.
- **Response:**
  - `accessToken` (string): A JWT access token for the user.
  - `refreshToken` (string): A refresh token to obtain a new access token.
  - `user` (object): The user's profile information.

### `POST /auth/apple`

Log in or register a user with an Apple ID token.

- **Request Body:**
  - `idToken` (string, required): The Apple ID token.
  - `nonce` (string, optional): The nonce used during the Apple sign-in process.
- **Response:**
  - `accessToken` (string): A JWT access token for the user.
  - `refreshToken` (string): A refresh token to obtain a new access token.
  - `user` (object): The user's profile information.

### `GET /auth/profile`

Get the profile of the currently authenticated user.

- **Authentication:** Requires a valid JWT access token.
- **Response:**
  - The user's profile information.

### `PATCH /auth/profile`

Update the profile of the currently authenticated user.

- **Authentication:** Requires a valid JWT access token.
- **Request Body (multipart/form-data):**
  - `name` (string, optional): The user's new name.
  - `file` (file, optional): A new avatar image for the user.
- **Response:**
  - The updated user profile.

### `PATCH /auth/password`

Update the password of the currently authenticated user.

- **Authentication:** Requires a valid JWT access token.
- **Request Body:**
  - `oldPassword` (string, required): The user's current password.
  - `newPassword` (string, required): The user's new password.
- **Response:**
  - A success message.

## Audio

Endpoints for managing audio settings.

### `PATCH /audio/settings`

Update the audio settings for the currently authenticated user.

- **Authentication:** Requires a valid JWT access token.
- **Request Body:**
  - `deviceId` (string, required): The ID of the audio device.
  - `volume` (number, required): The volume level (0-100).
- **Response:**
  - The updated audio settings.

## Preferences

Endpoints for managing user preferences.

### `PATCH /preferences`

Update the visual preferences for the currently authenticated user.

- **Authentication:** Requires a valid JWT access token.
- **Request Body:**
  - `theme` (string, optional): The color theme (e.g., 'light', 'dark').
  - `fontSize` (number, optional): The font size in pixels.
  - `brightness` (number, optional): The brightness level (0-100).
- **Response:**
  - The updated preferences.

## Transcription (WebSocket)

The transcription service uses WebSockets for real-time communication.

### Events Emitted by the Client

#### `startStream`

Starts a new transcription stream.

- **Payload:**
  - `inputLang` (string, required): The language of the audio being sent.
  - `outputLang` (string, required): The language to translate the transcription into.

#### `audioData`

Sends a chunk of audio data to be transcribed.

- **Payload:**
  - `data` (ArrayBuffer, required): The raw audio data.

### Events Emitted by the Server

#### `transcriptionUpdate`

Sends a transcription result to the client.

- **Payload:**
  - An object containing the transcription and translation.

#### `streamError`

Sends an error message to the client.

- **Payload:**
  - `message` (string): A description of the error.
