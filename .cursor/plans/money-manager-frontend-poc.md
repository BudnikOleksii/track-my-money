# Money Manager Frontend PoC

## Overview

Create a Next.js-based frontend application to demonstrate the core functionality of the Money Manager API. The PoC will showcase user authentication, transaction management, category management, and balance visualization in a modern, responsive web interface.

## Tech Stack

### Core Framework

- **Next.js 14+** (App Router) - React framework with server-side rendering
- **React 19** - UI library
- **TypeScript** - Type safety

### State Management & Data Fetching

- **TanStack Query (React Query)** - Server state management and caching
- **Zustand** or **Context API** - Local UI state management

### UI Components & Styling

- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - High-quality component library
- **Radix UI** - Accessible component primitives
- **React Hook Form** - Form management
- **Zod** - Schema validation

### Authentication & API

- **Axios** or **fetch** - HTTP client
- **JWT tokens** - Secure authentication
- Use existing `@track-my-money/api-shared` package for shared types

### Development Tools

- **ESLint** - Linting (use existing config from workspace)
- **Prettier** - Code formatting
- **Turbo** - Monorepo build system

## Project Structure

```
apps/web/
├── public/              # Static assets
├── src/
│   ├── app/            # Next.js App Router pages
│   │   ├── (auth)/     # Auth routes (signup, login)
│   │   │   ├── signup/
│   │   │   └── login/
│   │   ├── (dashboard)/ # Protected dashboard routes
│   │   │   ├── dashboard/      # Main dashboard
│   │   │   ├── transactions/   # Transaction list
│   │   │   ├── categories/     # Category management
│   │   │   └── layout.tsx      # Dashboard layout
│   │   ├── api/        # Next.js API routes (if needed)
│   │   ├── layout.tsx  # Root layout
│   │   └── page.tsx    # Landing page
│   ├── components/     # Reusable React components
│   │   ├── ui/         # Base UI components (button, card, etc.)
│   │   ├── auth/       # Auth-specific components
│   │   ├── transactions/
│   │   └── categories/
│   ├── lib/            # Utilities and helpers
│   │   ├── api/        # API client setup
│   │   ├── auth/       # Auth utilities
│   │   └── utils.ts    # General utilities
│   ├── hooks/          # Custom React hooks
│   │   ├── use-auth.ts
│   │   ├── use-transactions.ts
│   │   └── use-categories.ts
│   ├── store/          # Global state (Zustand)
│   │   └── auth-store.ts
│   ├── types/          # TypeScript types (from api-shared)
│   └── styles/         # Global styles
├── tailwind.config.ts
├── next.config.js
├── tsconfig.json
└── package.json
```

## Core Features to Implement

### 1. Authentication Flow

**Pages:**

- `/signup` - User registration
- `/login` - User login
- Email verification flow (optional for PoC)

**Functionality:**

- Sign up with email, password, name
- Login with email and password
- JWT token storage (httpOnly cookies or localStorage)
- Auto token refresh on expiry
- Protected routes with middleware
- Logout functionality

**API Endpoints to Use:**

- `POST /auth/signup` - Register new user
- `POST /auth/login` - Login
- `POST /auth/refresh` - Refresh tokens
- `POST /auth/logout` - Logout
- `GET /auth/profile` - Get current user

### 2. Dashboard

**Page: `/dashboard`**

**Components:**

- Balance summary card (income vs expenses, net balance)
- Recent transactions list (last 10)
- Quick add transaction button
- Monthly spending chart (basic line/bar chart)
- Category breakdown (pie chart or bar chart)

**API Endpoints to Use:**

- `GET /transactions/balance` - Get balance statistics
- `GET /transactions?limit=10` - Get recent transactions
- `GET /categories` - Get all categories

### 3. Transaction Management

**Page: `/transactions`**

**Features:**

- List all transactions with pagination
- Filter by:
  - Date range (start/end date)
  - Transaction type (income/expense)
  - Category
- Sort by date (newest/oldest first)
- Add new transaction
- Edit transaction (modal or separate page)
- Delete transaction
- Search by description

**Add Transaction Form:**

- Amount (number input with currency)
- Date (date picker)
- Description (text input)
- Note (optional textarea)
- Currency (select dropdown)
- Type (income/expense toggle)
- Category (select with subcategories)
- Subcategory (optional, depends on category)

**API Endpoints to Use:**

- `GET /transactions` - List with filters
- `GET /transactions/:id` - Get single transaction
- `POST /transactions` - Create transaction
- `PATCH /transactions/:id` - Update transaction
- `DELETE /transactions/:id` - Delete transaction

### 4. Category Management

**Page: `/categories`**

**Features:**

- List all categories grouped by type (income/expense)
- Show hierarchical structure (parent → subcategories)
- Add new category
- Edit category
- Delete category (with warning if transactions exist)
- Filter by type
- Nested subcategory support

**Add/Edit Category Form:**

- Name (text input)
- Type (income/expense toggle)
- Parent category (optional select)

**API Endpoints to Use:**

- `GET /categories` - List all categories
- `GET /categories/:id` - Get single category
- `POST /categories` - Create category
- `PATCH /categories/:id` - Update category
- `DELETE /categories/:id` - Delete category

## UI/UX Design Principles

### Layout

- **Header:** Logo, navigation menu, user profile dropdown
- **Sidebar:** Navigation (optional for desktop)
- **Main Content Area:** Dynamic content based on route
- **Responsive Design:** Mobile-first approach

### Color Scheme

- Primary: Money-related green or blue
- Success: Green for income
- Danger: Red for expenses
- Neutral: Gray scale for UI elements

### Typography

- Clean, readable fonts (system fonts or Google Fonts)
- Clear hierarchy (headings, subheadings, body)

### Accessibility

- Keyboard navigation
- Screen reader support
- High contrast text
- Focus indicators
- ARIA labels

## Component Library (shadcn/ui)

**Base Components to Use:**

- `Button` - Actions and navigation
- `Card` - Container for content blocks
- `Input` - Form inputs
- `Select` - Dropdown selections
- `Dialog` - Modals for forms
- `Table` - Transaction listings
- `Badge` - Category tags
- `Avatar` - User profile
- `Toast` - Notification messages
- `Calendar` - Date picker

## Data Management Strategy

### API Client Setup

- Base URL configuration from environment variables
- Request/Response interceptors for:
  - Adding JWT token to headers
  - Token refresh on 401
  - Error handling and notifications
- Type-safe API functions using TypeScript

### State Management

- **TanStack Query:**
  - Use for server state (transactions, categories, balance)
  - Automatic caching and invalidation
  - Optimistic updates for better UX
- **Zustand/Context:**
  - Use for UI state (sidebar toggle, theme)
  - Auth state persistence

### Type Safety

- Import types from `@track-my-money/api-shared`
- Create additional UI-specific types as needed
- Shared enums: `TransactionType`, `Currency`, `UserRole`

## API Integration

### Environment Variables

```env
# .env.local
NEXT_PUBLIC_API_URL=http://localhost:3001
# For production: https://api.yourdomain.com
```

### API Client Pattern

```typescript
// lib/api/client.ts
export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

apiClient.interceptors.request.use((config) => {
  const token = getAuthToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

### Custom Hooks Pattern

```typescript
// hooks/use-transactions.ts
export const useTransactions = (filters: TransactionQueryDto) => {
  return useQuery({
    queryKey: ['transactions', filters],
    queryFn: () => fetchTransactions(filters),
  });
};

// Mutation for creating
export const useCreateTransaction = () => {
  return useMutation({
    mutationFn: createTransaction,
    onSuccess: () => {
      queryClient.invalidateQueries(['transactions']);
      queryClient.invalidateQueries(['balance']);
    },
  });
};
```

## Styling Approach

### Tailwind CSS Setup

- Custom color palette matching brand
- Responsive breakpoints
- Dark mode support (optional)
- Custom components with Tailwind classes

### Component Structure

```typescript
// Example component
export const TransactionCard = ({ transaction }) => {
  return (
    <Card className="p-4 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="font-semibold">{transaction.description}</h3>
          <p className="text-sm text-gray-500">{transaction.category.name}</p>
        </div>
        <Badge variant={transaction.type === 'INCOME' ? 'success' : 'danger'}>
          {formatAmount(transaction.amount, transaction.currency)}
        </Badge>
      </div>
    </Card>
  );
};
```

## Responsive Design Breakpoints

- **Mobile:** < 640px (sm)
- **Tablet:** 640px - 1024px (md, lg)
- **Desktop:** > 1024px (xl, 2xl)

### Mobile-First Components

- Stack elements vertically on mobile
- Use collapsible sidebar on mobile
- Bottom navigation bar for quick actions
- Touch-friendly button sizes (min 44x44px)

## Form Validation

### Using Zod + React Hook Form

```typescript
// Example validation schema
const transactionSchema = z.object({
  amount: z.number().positive(),
  date: z.date(),
  description: z.string().min(1),
  categoryId: z.string().uuid(),
  type: z.enum(['INCOME', 'EXPENSE']),
});

type TransactionFormData = z.infer<typeof transactionSchema>;
```

### Error Handling

- Display field-level errors inline
- Show toast notifications for API errors
- Handle network errors gracefully
- Loading states for async operations

## Security Considerations

### Token Storage

- Store JWT tokens securely
- Options: httpOnly cookies (preferred) or localStorage
- Automatic token refresh before expiry

### Route Protection

- Next.js middleware for protected routes
- Redirect to login if unauthenticated
- Check token validity on mount

### Input Validation

- Client-side validation with Zod
- Sanitize user inputs
- Prevent XSS attacks with React's built-in escaping

## Performance Optimizations

### Code Splitting

- Lazy load pages with Next.js dynamic imports
- Split large components into smaller chunks

### Image Optimization

- Use Next.js Image component
- Optimize asset sizes

### Caching Strategy

- TanStack Query default caching
- Static page generation where possible
- Service worker for offline support (future)

## Testing Strategy (Future)

- **Unit Tests:** React Testing Library for components
- **Integration Tests:** API integration tests
- **E2E Tests:** Playwright or Cypress
- **Accessibility Tests:** axe DevTools

## Dependencies to Install

```json
{
  "dependencies": {
    "next": "14.x",
    "react": "19.2.0",
    "react-dom": "19.2.0",
    "@tanstack/react-query": "^5.x",
    "axios": "^1.x",
    "zod": "^3.x",
    "react-hook-form": "^7.x",
    "@hookform/resolvers": "^3.x",
    "zustand": "^4.x",
    "date-fns": "^3.x",
    "recharts": "^2.x",
    "@radix-ui/react-dialog": "^1.x",
    "@radix-ui/react-select": "^2.x",
    "@radix-ui/react-dropdown-menu": "^2.x",
    "tailwindcss": "^3.x",
    "autoprefixer": "^10.x",
    "postcss": "^8.x",
    "clsx": "^2.x",
    "tailwind-merge": "^2.x"
  },
  "devDependencies": {
    "@types/node": "^20",
    "@types/react": "^18",
    "@types/react-dom": "^18",
    "typescript": "^5.x",
    "eslint": "^9.x",
    "prettier": "^3.x"
  }
}
```

## Implementation Phases

### Phase 1: Project Setup (1-2 days)

- [ ] Initialize Next.js app in `apps/web`
- [ ] Configure TypeScript
- [ ] Setup Tailwind CSS
- [ ] Install shadcn/ui components
- [ ] Configure ESLint and Prettier
- [ ] Setup API client with Axios
- [ ] Configure environment variables

### Phase 2: Authentication (2-3 days)

- [ ] Install auth dependencies
- [ ] Create login page UI
- [ ] Create signup page UI
- [ ] Implement auth API functions
- [ ] Setup token storage and refresh logic
- [ ] Create auth context/hook
- [ ] Implement protected routes middleware
- [ ] Add logout functionality

### Phase 3: Dashboard UI (2-3 days)

- [ ] Create dashboard layout
- [ ] Build balance summary card
- [ ] Implement recent transactions list
- [ ] Add quick add transaction button
- [ ] Create category overview section
- [ ] Add basic charts (Recharts)
- [ ] Make responsive

### Phase 4: Transactions (3-4 days)

- [ ] Create transactions page
- [ ] Build transaction list table
- [ ] Implement filters (date, type, category)
- [ ] Add search functionality
- [ ] Create add/edit transaction modal
- [ ] Implement pagination
- [ ] Add delete confirmation
- [ ] Optimistic updates

### Phase 5: Categories (2-3 days)

- [ ] Create categories page
- [ ] Display hierarchical category list
- [ ] Add create/edit category modal
- [ ] Implement delete with warning
- [ ] Add type filtering
- [ ] Show transaction count per category

### Phase 6: Polish & Testing (2-3 days)

- [ ] Add loading states and skeletons
- [ ] Implement error boundaries
- [ ] Add toast notifications
- [ ] Fix responsive issues
- [ ] Test all user flows
- [ ] Performance optimization
- [ ] Accessibility improvements

## PoC Success Criteria

### Must Have

- ✅ User can sign up and log in
- ✅ User can view balance summary
- ✅ User can create and view transactions
- ✅ User can filter transactions by date range
- ✅ User can manage categories (CRUD)
- ✅ Responsive design works on mobile
- ✅ Protected routes work correctly
- ✅ Token refresh works automatically

### Nice to Have

- Charts and visualization
- Search functionality
- Advanced filtering
- Bulk operations
- Export data (CSV)
- Dark mode

## API Endpoints Summary

### Auth Endpoints

- `POST /auth/signup` - Register user
- `POST /auth/login` - Login
- `POST /auth/refresh` - Refresh token
- `POST /auth/logout` - Logout
- `GET /auth/profile` - Get current user

### Transaction Endpoints

- `GET /transactions` - List with filters
- `GET /transactions/:id` - Get single
- `POST /transactions` - Create
- `PATCH /transactions/:id` - Update
- `DELETE /transactions/:id` - Delete
- `GET /transactions/balance` - Get balance

### Category Endpoints

- `GET /categories` - List all
- `GET /categories/:id` - Get single
- `POST /categories` - Create
- `PATCH /categories/:id` - Update
- `DELETE /categories/:id` - Delete

## Shared Types Available

From `@track-my-money/api-shared`:

- `UserEntity`
- `TransactionEntity`, `CreateTransactionDto`, `UpdateTransactionDto`
- `CategoryEntity`, `CreateCategoryDto`, `UpdateCategoryDto`
- `TransactionType`, `Currency`, `UserRole`, `CountryCode`
- `AuthResponseDto`, `SignupDto`, `LoginDto`

## Next Steps After PoC

- User preferences and settings page
- Multiple currency support and exchange rates
- Advanced analytics and reporting
- Budget tracking and alerts
- Recurring transactions
- Mobile app (React Native)
- Email notifications
- Data export/import
- Multi-user household support
- Receipt photo upload
- AI-powered categorization
