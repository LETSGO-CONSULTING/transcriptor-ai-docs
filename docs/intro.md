---
id: introduction
title: Live Translation
sidebar_label: Introduction
---

# Live Translation – Real-time Speech Translation Platform

**Live Translation** is a desktop application designed to break language barriers in real-time meetings and conversations. It captures audio from your microphone and system, transcribing and translating it instantly.

This documentation site centralizes product, architecture, implementation, and operations knowledge for the whole platform.

## Vision

Provide a seamless, low-latency translation tool that allows users to:

*   Understand conversations in foreign languages instantly.
*   Communicate effectively in international meetings (Zoom, Teams, Meet).
*   Customize their visual and audio experience.

## Core Principles

*   **Real-time first** – Latency is the enemy. We use WebSockets and optimized audio streams.
*   **Privacy focused** – Audio is processed in memory and never stored permanently.
*   **Cross-platform** – Built with Electron to run on Windows, macOS, and Linux.
*   **Cloud-powered** – Leverages Azure Cognitive Services for state-of-the-art accuracy.

## Documentation Scope

This site covers:

*   **Architecture:** How Electron, NestJS, and Azure interact.
*   **Backend:** WebSocket gateways, authentication, and Azure integration.
*   **Frontend:** Audio capture (microphone & system), AudioWorklets, and UI.
*   **Database:** Prisma schema and user preferences.
*   **DevOps:** Installation, building, and deployment guides.

Use this documentation as the single source of truth for the Live Translation platform.
