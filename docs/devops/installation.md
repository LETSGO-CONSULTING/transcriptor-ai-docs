---
title: Installation Guide
sidebar_position: 1
---

# Installation Guide

This guide explains how to install and run the complete project in a local development environment.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: Version 18 or higher.
- **npm**: Usually installed with Node.js.
- **PostgreSQL**: A running local instance of the PostgreSQL database.
- **Git**: To clone the repositories.

## 1. Backend (NestJS API)

The backend handles business logic, communication with Azure, and WebSockets.

### Steps

1.  **Clone the Repository**
    ```bash
    git clone <your-backend-repo-url>
    cd live-translation-api
    ```

2.  **Install Dependencies**
    ```bash
    npm install
    ```

3.  **Configure Environment Variables**
    Create a `.env` file in the root of the project and configure it (see the Configuration Guide). Ensure your `DATABASE_URL` points to your local PostgreSQL instance.

4.  **Create and Migrate the Database**
    This command will create the database if it doesn't exist and apply all necessary tables.
    ```bash
    npx prisma migrate dev
    ```

5.  **Start the Server**
    The server will be running at `http://localhost:3000`.
    ```bash
    npm run start:dev
    ```

## 2. Frontend (Electron + Angular)

The desktop application the user sees and interacts with.

### Steps

1.  **Clone the Repository**
    ```bash
    git clone <your-frontend-repo-url>
    cd live-translation-desktop
    ```

2.  **Install Dependencies**
    ```bash
    npm install
    ```

3.  **Start the Application**
    This command starts the Angular development server and then launches the Electron window.
    ```bash
    npm start
    ```
    *Alternatively, if you have a specific script for local development:*
    ```bash
    npm run electron:local
    ```
