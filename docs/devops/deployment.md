---
title: Deployment Guide
sidebar_position: 2
---

# Deployment Guide

This guide covers the process of building and deploying both the backend API and the desktop application for production.

## 1. Backend (NestJS API)

The backend is a standard Node.js application that can be deployed to any cloud provider or server that supports Node.js.

### Build Process

To prepare the application for production, you need to compile the TypeScript code into JavaScript.

```bash
npm run build
```

This command will create a `dist` directory containing the compiled application.

### Deployment Steps

1.  **Environment Variables**: Ensure all production environment variables are set on your server (e.g., `DATABASE_URL`, `JWT_SECRET`, `AZURE_SPEECH_KEY`).
2.  **Database Migrations**: Apply the database migrations to your production database.
    ```bash
    npx prisma migrate deploy
    ```
3.  **Start the Application**: Run the compiled application.
    ```bash
    node dist/main
    ```

### Docker Deployment (Recommended)

For a more consistent deployment, you can use Docker.

1.  **Build the Image**:
    ```bash
    docker build -t live-translation-api .
    ```
2.  **Run the Container**:
    ```bash
    docker run -p 3000:3000 --env-file .env live-translation-api
    ```

## 2. Frontend (Electron + Angular)

Deploying the desktop application involves building the Angular app and then packaging it into an executable installer (e.g., `.exe`, `.dmg`, `.AppImage`) using Electron Builder.

### Build & Package

1.  **Build Angular**: Compile the Angular application for production.
    ```bash
    npm run build
    ```
    This will generate the static files in the `dist/` directory.

2.  **Package Electron**: Use the packaging script to create the installers.
    ```bash
    npm run electron:build
    ```
    *Note: This command depends on your `package.json` scripts. It typically runs `electron-builder`.*

### Output

The build artifacts will be located in the `release/` or `dist/` folder (depending on configuration). You will find:
*   **Windows**: `LiveTranslation-Setup.exe`
*   **macOS**: `LiveTranslation.dmg`
*   **Linux**: `LiveTranslation.AppImage`

### Distribution

Once packaged, these files can be distributed to users via:
*   **Direct Download**: Hosting the files on a web server or cloud storage (S3, Azure Blob).
*   **GitHub Releases**: Uploading the artifacts to a GitHub Release.
*   **Auto-Update**: Configuring `electron-updater` to check for new versions from your chosen provider.
