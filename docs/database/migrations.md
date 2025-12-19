---
title: Migrations
sidebar_position: 2
---

# Database Migrations

The application uses **Prisma Migrate** to manage changes to the database schema. This ensures that the database structure evolves in a controlled and versioned manner, making it easy to deploy updates and collaborate with other developers.

## How It Works

Prisma Migrate translates the declarative data model defined in `schema.prisma` into imperative SQL migration files. These files are stored in the `prisma/migrations` directory and serve as a historical record of all changes made to the database.

### The Migration Process

1.  **Edit Schema**: Developers modify the `schema.prisma` file to add new models, fields, or relationships.
2.  **Generate Migration**: Running the migration command compares the new schema with the current database state and generates a new SQL file containing the necessary `CREATE`, `ALTER`, or `DROP` statements.
3.  **Apply Migration**: The generated SQL is executed against the database to update its structure.
4.  **Update Client**: The Prisma Client is regenerated to reflect the new schema in the application code.

## Key Commands

### Development

To create and apply a new migration during development:

```bash
npx prisma migrate dev --name <migration_name>
```

*   **`--name`**: A descriptive name for the migration (e.g., `add_user_settings`).
*   This command automatically:
    1.  Generates a new SQL migration file in `prisma/migrations`.
    2.  Applies the migration to the local database.
    3.  Regenerates the Prisma Client.

### Production

To apply pending migrations in a production environment:

```bash
npx prisma migrate deploy
```

*   This command only applies the existing migration files to the database. It does **not** generate new migrations or modify the schema, ensuring that the production database exactly matches the tested development state.

## Migration History

The `prisma/migrations` directory contains a folder for each migration. Inside each folder is a `migration.sql` file with the actual SQL commands. This history should be committed to version control (Git) to ensure all team members and environments are synchronized.
