---
title: Config Module
sidebar_position: 8
---

# Config Module

The **Config Module** is a crucial part of the backend infrastructure, responsible for managing environment variables and application configuration. It provides a standardized way to access configuration settings throughout the application, ensuring that sensitive information like API keys and database credentials are not hard-coded.

## Responsibilities

The primary responsibilities of the Config Module include:

1.  **Loading Environment Variables**: It loads variables from a `.env` file in the project's root directory, making them accessible through the `ConfigService`.
2.  **Providing Global Access**: It is configured as a global module, meaning that the `ConfigService` is available in all other modules without needing to import the `ConfigModule` explicitly.
3.  **Enhancing Security**: By separating configuration from code, it allows for better security practices and makes it easier to manage different configurations for development, staging, and production environments.

## Usage

The `ConfigModule` is imported in the `AppModule` with `ConfigModule.forRoot({ isGlobal: true })`. This single line of code enables the entire application to safely access environment variables.

For example, when configuring the `JwtModule`, the `ConfigService` is used to fetch the JWT secret and expiration time:

```typescript
// In app.module.ts
JwtModule.registerAsync({
    global: true,
    inject: [ConfigService],
    useFactory: (cfg: ConfigService) => ({
        secret: cfg.get('JWT_ACCESS_SECRET'),
        signOptions: { expiresIn: cfg.get('JWT_ACCESS_TTL') },
    }),
}),
```

This approach ensures that sensitive values are managed in a secure and flexible way, allowing for easy updates without changing the application's code.
