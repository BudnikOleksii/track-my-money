<!-- 81bde6b7-cbd7-4cf6-8ced-657ecfd2d183 e2e870fd-5a15-48b5-8388-0087fc44bcae -->
# Money Manager API MVP

## Overview

Create a complete NestJS API with PostgreSQL database and Prisma ORM for managing personal finances. The API will support user authentication, transaction management, and hierarchical categories.

## Docker Setup (Starting Point)

Create `apps/api/docker-compose.yml` with:

- **PostgreSQL service**: port 5432, with persistent volume
- **pgAdmin service**: port 5050 for database management UI
- Environment variables for database credentials

## Database Schema (Prisma)

Create `apps/api/prisma/schema.prisma` with the following models:

**User Model**

- id (UUID primary key)
- email (unique, indexed)
- password (hashed with bcrypt)
- name
- role (enum: USER, ADMIN, SUPER_ADMIN) - default USER
- createdAt, updatedAt
- Relations: transactions, categories
- **Indexes**: @@unique([email]), @@index([email])

**Category Model**

- id (UUID primary key)
- name
- type (enum: INCOME, EXPENSE)
- userId (foreign key)
- parentCategoryId (optional, self-relation for subcategories)
- createdAt, updatedAt
- Relations: user, transactions, parent category, subcategories
- **Indexes**: @@index([userId]), @@index([userId, type])

**Transaction Model**

- id (UUID primary key)
- amount (Decimal for precision)
- date (DateTime, indexed)
- description
- note (optional text field)
- currency (string, default "USD")
- type (enum: INCOME, EXPENSE)
- userId (foreign key)
- categoryId (foreign key)
- subcategoryId (optional foreign key)
- createdAt, updatedAt
- Relations: user, category, subcategory
- **Indexes**: @@index([userId]), @@index([date]), @@index([userId, date])

## Core Modules to Implement

### 1. Prisma Module

- Set up PrismaService as a global module
- Configure database connection and client

### 2. Auth Module

- **POST /auth/signup** - Register new user (hash password with bcrypt)
- **POST /auth/login** - Login with email/password, return JWT token
- **GET /auth/profile** - Get current user profile (protected)
- JWT strategy with passport-jwt
- Auth guard for protecting routes
- Prepare structure for future Firebase authentication integration

### 3. Categories Module

- **GET /categories** - List user's categories (with subcategories nested)
- **POST /categories** - Create new category or subcategory
- **PATCH /categories/:id** - Update category
- **DELETE /categories/:id** - Delete category (check for transactions first)
- Filter by type (INCOME/EXPENSE)

### 4. Transactions Module

- **GET /transactions** - List transactions with filters (date range, category, type)
- **GET /transactions/:id** - Get single transaction
- **POST /transactions** - Create new transaction
- **PATCH /transactions/:id** - Update transaction
- **DELETE /transactions/:id** - Delete transaction
- **GET /transactions/balance** - Calculate balance (sum of all transactions)
- Support pagination and sorting

## Dependencies to Install

```bash
pnpm add @nestjs/passport @nestjs/jwt passport passport-jwt bcrypt @prisma/client
pnpm add -D @types/passport-jwt @types/bcrypt prisma
```

## Environment Configuration

Create `.env` file in `apps/api/`:

- DATABASE_URL (PostgreSQL connection string)
- JWT_SECRET
- JWT_EXPIRES_IN

## Shared Package Structure

All entities and DTOs will be exported through `packages/api-shared/src/entry.ts`:

- Auth DTOs (signup, login, auth response)
- Category entities and DTOs
- Transaction entities and DTOs
- User entity (without password)
- Enums (UserRole, TransactionType, CategoryType)

This allows sharing types between API and future frontend applications.

## Key Implementation Details

- Use class-validator and class-transformer for DTO validation
- Implement global validation pipe in `main.ts`
- Use Prisma transactions for data consistency where needed
- Hash passwords with bcrypt (salt rounds: 10)
- JWT tokens expire in 7 days (configurable)
- All routes except auth endpoints require JWT authentication
- Role-based access control (RBAC) using guards and decorators
- Database indexes on frequently queried fields (email, userId, date)
- UUID for all primary keys
- Currency stored as string (ISO 4217 codes like USD, EUR)
- Prepare for future migrations and seeding

## File Structure

```
apps/api/src/
├── auth/
│   ├── auth.module.ts
│   ├── auth.controller.ts
│   ├── auth.service.ts
│   ├── dto/ (signup, login DTOs)
│   ├── guards/ (jwt-auth.guard.ts)
│   └── strategies/ (jwt.strategy.ts)
├── categories/
│   ├── categories.module.ts
│   ├── categories.controller.ts
│   ├── categories.service.ts
│   └── dto/ (create, update category DTOs)
├── transactions/
│   ├── transactions.module.ts
│   ├── transactions.controller.ts
│   ├── transactions.service.ts
│   └── dto/ (create, update transaction DTOs)
├── prisma/
│   ├── prisma.module.ts
│   └── prisma.service.ts
└── app.module.ts (import all modules)
```

## Testing Strategy

- Create seed data for development
- Test authentication flow
- Test CRUD operations for categories and transactions
- Test balance calculation with various scenarios
- Verify cascade rules and data integrity

### To-dos

- [x] Install Prisma dependencies and initialize Prisma with PostgreSQL schema
- [x] Define Prisma schema with User, Category, and Transaction models
- [x] Create PrismaModule and PrismaService for database access
- [x] Install authentication dependencies (JWT, Passport, bcrypt)
- [x] Implement Auth module with signup, login, JWT strategy and guards
- [x] Implement Categories module with CRUD operations and subcategory support
- [x] Implement Transactions module with CRUD, filtering, and balance calculation
- [x] Configure global validation pipe and error handling
- [x] Set up environment configuration and ConfigModule
- [x] Create seed data and test all endpoints