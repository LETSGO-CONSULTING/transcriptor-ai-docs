---
title: Database Schema
sidebar_position: 1
---

# Database Schema

PostgreSQL managed with **Prisma ORM 6.16.2** hosted on **Neon (us-east-1)**.

## Models

### Users & Auth

#### `users`
| Field | Type | Notes |
|-------|------|-------|
| id | UUID | PK |
| email | String | Unique |
| password | String? | Nullable (social logins) |
| name | String? | |
| picture | String? | Avatar URL |
| is_email_verified | Boolean | |
| role | Enum | USER / ADMIN |
| last_login_provider | String? | google / local |
| created_at | DateTime | |

Relations: settings (1:1), refresh_tokens (1:N), user_identities (1:N), user_payments (1:N)

#### `user_identities`
OAuth provider links (Google).

| Field | Type |
|-------|------|
| id | BigInt |
| user_id | UUID FK |
| provider | String (google) |
| provider_user_id | String |
| raw_profile | Json? |

#### `refresh_tokens`
| Field | Type |
|-------|------|
| id | BigInt |
| user_id | UUID FK |
| token_hash | String |
| expires_at | DateTime |
| revoked_at | DateTime? |

#### `password_reset_tokens`
| Field | Type |
|-------|------|
| id | BigInt |
| user_id | UUID FK |
| token | String |
| expires_at | DateTime |

### Preferences

#### `user_settings`
| Field | Type | Default |
|-------|------|---------|
| id | String | |
| user_id | UUID FK | |
| selected_audio_input_id | String? | |
| selected_audio_output_id | String? | |
| selected_input_language_code | String? | |
| selected_output_language_code | String? | |
| theme | String | system |
| font_family | String | Inter |
| font_size_scale | Float | 1.0 |
| brightness | Float | 1.0 |

### Languages

#### `languages`
| Field | Type |
|-------|------|
| id | String |
| code | String (e.g. en-US) |
| name | String |
| supports_stt | Boolean |
| supports_translation | Boolean |

### Billing & Payments

#### `pricing_plans`
| Field | Type |
|-------|------|
| id | String |
| name | String |
| minutes_per_month | Int |
| price | Float |
| currency | String |
| stripe_price_id | String? |

#### `pricing_topups`
| Field | Type |
|-------|------|
| id | String |
| name | String |
| minutes | Int |
| price | Float |
| currency | String |
| stripe_price_id | String? |

#### `user_subscriptions`
| Field | Type |
|-------|------|
| id | String |
| user_id | UUID FK |
| plan_id | FK |
| status | Enum (active/cancelled/expired) |
| minutes_used | Int |
| minutes_remaining | Int |
| renews_at | DateTime |

#### `user_payments`
| Field | Type |
|-------|------|
| id | String |
| user_id | UUID FK |
| amount | Float |
| currency | String |
| provider | String (stripe/paypal/culqi) |
| status | Enum |
| metadata | Json? |

### Audit

#### `audit_logs`
| Field | Type |
|-------|------|
| id | BigInt |
| user_id | UUID FK |
| action | String |
| resource | String |
| metadata | Json? |
| created_at | DateTime |

## Commands

```bash
npx prisma migrate dev      # Run migrations (dev)
npx prisma migrate deploy   # Run migrations (production)
npx prisma generate         # Regenerate client
npx prisma studio           # Visual DB browser
```
