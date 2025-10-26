<!-- 733f0665-41ee-4430-8f4e-3d84a0ee9e15 4918d47a-ca19-4998-9c75-ddc7bac7537d -->
# Frontend PoC Implementation Plan

## Overview

Build a modern React frontend application that connects to the existing NestJS API for tracking income and expenses. The app will use React 19.2 with Vite, RTK Query for API integration, Redux Toolkit for state management, and shadcn/ui for UI components.

## Tech Stack

- **Framework**: React 19.2 with Vite
- **Routing**: react-router-dom v7
- **State Management**: Redux Toolkit + RTK Query
- **UI Library**: shadcn/ui (Radix UI + Tailwind CSS)
- **Form Handling**: React Hook Form + Zod validation
- **TypeScript**: Full type safety using shared DTOs from `@track-my-money/api-shared`

## Project Structure

```
apps/web-poc/
├── src/
│   ├── features/              # Feature-based modules
│   │   ├── auth/
│   │   │   ├── pages/
│   │   │   │   ├── LoginPage.tsx
│   │   │   │   └── SignupPage.tsx
│   │   │   ├── components/
│   │   │   │   ├── LoginForm.tsx
│   │   │   │   └── SignupForm.tsx
│   │   │   ├── api/
│   │   │   │   └── authApi.ts      # RTK Query API slice
│   │   │   ├── store/
│   │   │   │   └── authSlice.ts    # Redux slice
│   │   │   └── utils/
│   │   ├── transactions/
│   │   │   ├── pages/
│   │   │   │   └── TransactionsPage.tsx
│   │   │   ├── components/
│   │   │   │   ├── TransactionList.tsx
│   │   │   │   ├── TransactionForm.tsx
│   │   │   │   └── BalanceCard.tsx
│   │   │   ├── api/
│   │   │   │   └── transactionsApi.ts
│   │   │   ├── hooks/
│   │   │   │   └── useTransactionFilters.ts
│   │   │   └── utils/
│   │   ├── categories/
│   │   │   ├── pages/
│   │   │   │   └── CategoriesPage.tsx
│   │   │   ├── components/
│   │   │   │   ├── CategoryList.tsx
│   │   │   │   └── CategoryForm.tsx
│   │   │   ├── api/
│   │   │   │   └── categoriesApi.ts
│   │   │   └── utils/
│   │   └── profile/
│   │       ├── pages/
│   │       │   └── ProfilePage.tsx
│   │       └── components/
│   │           └── ProfileCard.tsx
│   ├── shared/                # Shared resources
│   │   ├── ui/               # shadcn/ui components
│   │   │   ├── button.tsx
│   │   │   ├── input.tsx
│   │   │   ├── card.tsx
│   │   │   └── ...
│   │   ├── components/       # Shared components
│   │   │   ├── Layout.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   └── ProtectedRoute.tsx
│   │   ├── utils/
│   │   │   └── cn.ts
│   │   ├── hooks/
│   │   │   └── useAuth.ts
│   │   └── types/
│   │       └── index.ts
│   ├── store/                # Redux store setup
│   │   └── index.ts
│   ├── App.tsx               # Root component with routes
│   ├── main.tsx              # Entry point
│   └── index.css             # Global styles
```

## Key Features to Implement

### 1. Authentication Flow

- **Login page** (`/login`) - Email/password authentication
- **Signup page** (`/signup`) - User registration with email verification notice
- **Token management** - Store access/refresh tokens, auto-refresh on expiry
- **Protected routes** - Middleware to guard dashboard routes
- **Profile page** - Display user info, logout functionality

### 2. Transactions Management

- **Transaction list** - Paginated table with sorting, filtering by type/date/category
- **Create transaction** - Modal form with category selection, amount, date, description
- **Edit/Delete** - Update or remove transactions
- **Balance display** - Show current balance with income/expense breakdown

### 3. Categories Management

- **Category list** - Display income/expense categories
- **Create category** - Form to add new categories with type selection
- **Subcategories** - Support for parent-child category relationships
- **Edit/Delete** - Manage existing categories

### 4. Dashboard Layout

- **Sidebar navigation** - Links to transactions, categories, profile
- **Balance card** - Summary of current financial state
- **Recent transactions** - Quick view of latest transactions

## RTK Query API Integration

### Auth API (`store/api/authApi.ts`)

- `signup` - POST /auth/signup
- `login` - POST /auth/login
- `refreshToken` - POST /auth/refresh
- `logout` - POST /auth/logout
- `getProfile` - GET /auth/profile

### Transactions API (`store/api/transactionsApi.ts`)

- `getTransactions` - GET /transactions (with pagination/filtering)
- `getBalance` - GET /transactions/balance
- `getTransactionById` - GET /transactions/:id
- `createTransaction` - POST /transactions
- `updateTransaction` - PATCH /transactions/:id
- `deleteTransaction` - DELETE /transactions/:id

### Categories API (`store/api/categoriesApi.ts`)

- `getCategories` - GET /categories (with optional type filter)
- `getCategoryById` - GET /categories/:id
- `createCategory` - POST /categories
- `updateCategory` - PATCH /categories/:id
- `deleteCategory` - DELETE /categories/:id

## Authentication Strategy

- Store tokens in memory (Redux state) + httpOnly cookies for refresh token
- Implement automatic token refresh using RTK Query middleware
- Add Authorization header to all protected requests
- Handle 401 errors by refreshing token or redirecting to login

## UI Components (shadcn/ui)

Install and configure:

- Button, Input, Label, Card
- Table, Dialog, Select, Tabs
- Form components (with react-hook-form integration)
- Toast notifications for success/error messages
- Badge, Avatar, Dropdown Menu

## Environment Configuration

```
VITE_API_URL=http://localhost:3000
```

## Implementation Steps

1. **Setup React + Vite app** in `apps/web-poc/` with TypeScript, Tailwind CSS
2. **Install dependencies**: Redux Toolkit, RTK Query, react-router-dom, shadcn/ui, react-hook-form, zod
3. **Configure Redux store** with RTK Query base API and auth slice
4. **Setup shadcn/ui** - Initialize and install core components
5. **Create API slices** for auth, transactions, categories with full CRUD operations
6. **Build auth pages** - Login/signup forms with validation
7. **Implement protected layout** - Dashboard with sidebar navigation
8. **Build transaction features** - List, create, edit, delete with filtering
9. **Build category features** - List, create, edit, delete
10. **Add profile page** - Display user info and logout
11. **Polish UI/UX** - Loading states, error handling, responsive design

### To-dos

- [ ] Create React + Vite app in apps/web-poc with TypeScript, Tailwind CSS, and ESLint configuration
- [ ] Install Redux Toolkit, RTK Query, shadcn/ui, react-hook-form, zod, and other dependencies
- [ ] Configure Redux store with RTK Query base API and auth slice
- [ ] Initialize shadcn/ui and install core UI components
- [ ] Create RTK Query API slices for auth, transactions, and categories
- [ ] Build login and signup pages with form validation
- [ ] Implement dashboard layout with authentication middleware and sidebar navigation
- [ ] Build transaction list, create/edit forms, and filtering functionality
- [ ] Build category management with list and CRUD operations
- [ ] Create profile page with user info display and logout functionality
- [ ] Add loading states, error handling, toast notifications, and responsive design