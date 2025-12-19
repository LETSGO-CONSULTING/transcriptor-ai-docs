---
title: Security
sidebar_position: 9
---

# Security

The backend application's security is centered around JSON Web Tokens (JWT), which are used to authenticate and authorize user requests. The primary mechanism for enforcing this security is the `JwtAuthGuard`.

## JWT Authentication Guard (`JwtAuthGuard`)

The `JwtAuthGuard` is a NestJS guard that protects API endpoints by ensuring that incoming requests have a valid JWT access token. It is a crucial component of the application's security model.

### How It Works

1.  **Token Extraction**: The guard automatically extracts the JWT from the `Authorization` header of the incoming request.
2.  **Token Validation**: It verifies the token's signature and expiration date using the secret key configured in the `JwtModule`.
3.  **User Injection**: If the token is valid, the guard injects the user's information (extracted from the token's payload) into the request object. This allows downstream controllers and services to identify and act on behalf of the authenticated user.
4.  **Authorization**: If the token is invalid or missing, the guard throws an `UnauthorizedException`, preventing access to the protected endpoint.

### Usage

The `JwtAuthGuard` is typically applied to controllers or specific endpoints using the `@UseGuards()` decorator:

```typescript
import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../security/jwt-auth.guard';

@Controller('profile')
export class ProfileController {
    @Get()
    @UseGuards(JwtAuthGuard)
    getProfile() {
        // This endpoint is now protected
    }
}
```

By using this guard, the application can easily secure its endpoints and ensure that only authenticated users can access protected resources. The `JwtAuthGuard` is provided by the `AuthModule` and is available for use throughout the application.
