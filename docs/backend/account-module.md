---
title: Account Module
sidebar_position: 5
---

# Account Module

The **Account Module** is responsible for managing all aspects of a user's account, including billing, subscriptions, and usage history. It acts as a central hub that aggregates several specialized sub-modules to provide a comprehensive account management system.

## Responsibilities

The primary responsibilities of the Account Module include:

1.  **Exposing Account Endpoints**: It provides API endpoints for clients to retrieve and manage account-related information.
2.  **Aggregating Sub-modules**: It imports and coordinates the `PaymentsModule`, `SubscriptionsModule`, and `HistoryModule` to deliver a unified account management experience.

## Integrated Sub-modules

The Account Module integrates the following specialized modules:

*   **Payments Module**: Handles all payment-related logic, including processing transactions, managing payment methods, and interacting with payment gateways like Stripe.
*   **Subscriptions Module**: Manages user subscription plans, including activating, canceling, and upgrading subscriptions. It also tracks the status and billing cycle of each user's plan.
*   **History Module**: Keeps a record of a user's activity, such as transcription usage, billing history, and past subscription changes. This provides users with a clear overview of their account history.

By organizing these features into a single `AccountModule`, the application maintains a clean and scalable architecture where all account-related functionality is logically grouped and easy to manage.
