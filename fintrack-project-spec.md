# FinTrack - Financial Tracker Project Specification

## Overview

A personal financial tracker web application where users can manually log income and expenses, view summaries, and track spending by category.

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 14+ (App Router) |
| Language | TypeScript |
| Database | PostgreSQL (hosted on Neon) |
| ORM | Prisma |
| Styling | Tailwind CSS |
| Auth | Custom (bcrypt + JWT) |
| Hosting | Vercel |

---

## Database Schema

### Users Table

```sql
users
├── id              UUID (primary key, default uuid)
├── email           VARCHAR(255) unique, not null
├── password_hash   VARCHAR(255) not null
├── name            VARCHAR(100) not null
├── created_at      TIMESTAMP default now()
└── updated_at      TIMESTAMP
```

### Categories Table

```sql
categories
├── id              UUID (primary key)
├── user_id         UUID (foreign key → users.id, on delete cascade)
├── name            VARCHAR(50) not null
├── type            ENUM('income', 'expense')
├── icon            VARCHAR(50) nullable
├── color           VARCHAR(7) nullable (hex color)
└── created_at      TIMESTAMP default now()
```

### Transactions Table

```sql
transactions
├── id              UUID (primary key)
├── user_id         UUID (foreign key → users.id, on delete cascade)
├── category_id     UUID (foreign key → categories.id, nullable, on delete set null)
├── type            ENUM('income', 'expense')
├── amount          DECIMAL(12,2) not null
├── description     VARCHAR(255) not null
├── date            DATE not null
├── created_at      TIMESTAMP default now()
└── updated_at      TIMESTAMP
```

---

## Project Structure

```
fintrack/
├── app/
│   ├── (auth)/                    # Auth pages (no sidebar)
│   │   ├── login/
│   │   │   └── page.tsx
│   │   ├── signup/
│   │   │   └── page.tsx
│   │   └── layout.tsx
│   │
│   ├── (dashboard)/               # Protected pages (with sidebar)
│   │   ├── dashboard/
│   │   │   └── page.tsx
│   │   ├── transactions/
│   │   │   └── page.tsx
│   │   ├── categories/
│   │   │   └── page.tsx
│   │   ├── settings/
│   │   │   └── page.tsx
│   │   └── layout.tsx
│   │
│   ├── api/
│   │   ├── auth/
│   │   │   ├── register/
│   │   │   │   └── route.ts
│   │   │   ├── login/
│   │   │   │   └── route.ts
│   │   │   ├── logout/
│   │   │   │   └── route.ts
│   │   │   └── me/
│   │   │       └── route.ts
│   │   │
│   │   ├── transactions/
│   │   │   ├── route.ts
│   │   │   └── [id]/
│   │   │       └── route.ts
│   │   │
│   │   ├── categories/
│   │   │   ├── route.ts
│   │   │   └── [id]/
│   │   │       └── route.ts
│   │   │
│   │   └── summary/
│   │       └── route.ts
│   │
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
│
├── components/
│   ├── ui/
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Card.tsx
│   │   ├── Modal.tsx
│   │   └── Select.tsx
│   │
│   ├── layout/
│   │   ├── Sidebar.tsx
│   │   ├── MobileHeader.tsx
│   │   └── MobileNav.tsx
│   │
│   ├── dashboard/
│   │   ├── SummaryCards.tsx
│   │   ├── RecentTransactions.tsx
│   │   └── CategoryBreakdown.tsx
│   │
│   ├── transactions/
│   │   ├── TransactionList.tsx
│   │   ├── TransactionFilters.tsx
│   │   └── TransactionForm.tsx
│   │
│   └── categories/
│       ├── CategoryList.tsx
│       └── CategoryForm.tsx
│
├── lib/
│   ├── prisma.ts
│   ├── auth.ts
│   └── utils.ts
│
├── hooks/
│   ├── useAuth.ts
│   └── useTransactions.ts
│
├── types/
│   └── index.ts
│
├── prisma/
│   ├── schema.prisma
│   └── seed.ts
│
├── middleware.ts
├── .env.local
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## API Endpoints

### Authentication

| Method | Endpoint | Description | Request Body |
|--------|----------|-------------|--------------|
| POST | `/api/auth/register` | Create account | `{ email, password, name }` |
| POST | `/api/auth/login` | Login | `{ email, password }` |
| POST | `/api/auth/logout` | Logout | - |
| GET | `/api/auth/me` | Get current user | - |

### Transactions

| Method | Endpoint | Description | Request Body / Params |
|--------|----------|-------------|----------------------|
| GET | `/api/transactions` | List transactions | `?month=&year=&type=&category_id=` |
| POST | `/api/transactions` | Create transaction | `{ amount, type, description, category_id, date }` |
| GET | `/api/transactions/[id]` | Get single transaction | - |
| PUT | `/api/transactions/[id]` | Update transaction | `{ amount, type, description, category_id, date }` |
| DELETE | `/api/transactions/[id]` | Delete transaction | - |

### Categories

| Method | Endpoint | Description | Request Body |
|--------|----------|-------------|--------------|
| GET | `/api/categories` | List user's categories | - |
| POST | `/api/categories` | Create category | `{ name, type, icon?, color? }` |
| PUT | `/api/categories/[id]` | Update category | `{ name, type, icon?, color? }` |
| DELETE | `/api/categories/[id]` | Delete category | - |

### Summary

| Method | Endpoint | Description | Params |
|--------|----------|-------------|--------|
| GET | `/api/summary` | Dashboard stats | `?month=&year=` |

**Summary Response:**
```json
{
  "totalBalance": 12458.39,
  "monthlyIncome": 5875.00,
  "monthlyExpenses": 1842.61,
  "recentTransactions": [],
  "categoryBreakdown": []
}
```

---

## Pages & Features

### Login Page (`/login`)
- Email input with validation
- Password input with show/hide toggle
- "Remember me" checkbox
- "Forgot password?" link (placeholder for future)
- Link to signup page
- Error messages for invalid credentials
- Redirect to dashboard on success

### Signup Page (`/signup`)
- Name input
- Email input with validation
- Password input with show/hide toggle (min 8 characters)
- Confirm password input
- Link to login page
- Error messages for validation failures
- Auto-login and redirect to dashboard on success
- Create default categories for new user

### Dashboard Page (`/dashboard`)
- **Summary Cards:**
  - Total balance (all-time income minus expenses)
  - Monthly income (current month)
  - Monthly expenses (current month)
- **Recent Transactions:** Last 5-10 transactions
- **Category Breakdown:** Bar chart showing spending per category
- **Add Transaction Button:** Opens modal

### Transactions Page (`/transactions`)
- **Transaction List:** Table with columns:
  - Description
  - Category
  - Date
  - Amount (colored green/red)
  - Actions (edit, delete)
- **Filters:**
  - Date range (This Month, Last Month, Last 3 Months, This Year, Custom)
  - Type (All, Income, Expense)
  - Category dropdown
- **Add Transaction Button:** Opens modal
- **Pagination** for large lists

### Categories Page (`/categories`)
- List of income categories
- List of expense categories
- Add new category
- Edit category (name, icon, color)
- Delete category (with confirmation)

### Settings Page (`/settings`)
- Update profile (name, email)
- Change password
- Delete account (with confirmation)

### Add/Edit Transaction Modal
- Type toggle (Income / Expense)
- Amount input
- Description input
- Category dropdown (filtered by selected type)
- Date picker
- Save / Cancel buttons

---

## Default Categories (Created on Signup)

**Income:**
- Salary
- Freelance
- Investments
- Other Income

**Expense:**
- Food & Dining
- Transportation
- Utilities
- Entertainment
- Shopping
- Healthcare
- Other Expense

---

## Design Specifications

### Colors
```
Primary:        #6366f1 (Indigo)
Primary Dark:   #4f46e5
Success:        #10b981 (Green - income)
Danger:         #ef4444 (Red - expenses)
Background:     #f8fafc
Card:           #ffffff
Text:           #1e293b
Text Muted:     #64748b
Border:         #e2e8f0
```

### Typography
- Font: System font stack (Tailwind default)
- Headings: Bold, text-gray-900
- Body: Regular, text-gray-700
- Muted: Regular, text-gray-500

### Layout
- Sidebar: 256px width on desktop, hidden on mobile
- Mobile: Hamburger menu with slide-out navigation
- Content max-width: 1280px
- Card border-radius: 12px (rounded-xl)
- Button border-radius: 8px (rounded-lg)

### Responsive Breakpoints
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

---

## Validation Rules

### Email
- Valid email format
- Unique (no duplicate accounts)
- Normalized to lowercase

### Password
- Minimum 8 characters
- Hashed with bcrypt (cost factor 10)

### Transaction Amount
- Must be positive number
- Maximum 2 decimal places
- Max value: 9,999,999,999.99

### Transaction Date
- Cannot be in the future
- Required field

---

## Authentication Flow

### Registration
1. User submits email, password, name
2. Validate inputs
3. Check email doesn't already exist
4. Hash password with bcrypt
5. Create user in database
6. Create default categories for user
7. Generate JWT token
8. Set HTTP-only cookie
9. Return user data (without password)

### Login
1. User submits email, password
2. Find user by email
3. Compare password with bcrypt
4. Generate JWT token
5. Set HTTP-only cookie
6. Return user data

### Session Management
- JWT stored in HTTP-only cookie
- Token expires in 7 days
- Middleware checks token on protected routes
- Invalid/expired token redirects to login

---

## Environment Variables

```env
# Database (from Neon)
DATABASE_URL="postgresql://username:password@host/database?sslmode=require"

# Auth
JWT_SECRET="generate-a-secure-random-string-here"

# App
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

---

## Deployment Instructions

### Prerequisites
- GitHub account
- Vercel account (free)
- Neon account (free)

### Step 1: Set Up Neon Database

1. Go to [neon.tech](https://neon.tech) and sign up
2. Create a new project (e.g., "fintrack")
3. Choose a region close to your users
4. Copy the connection string (looks like `postgresql://...`)
5. Save it — you'll need it for Vercel

### Step 2: Push Code to GitHub

1. Create a new repository on GitHub
2. Push your code:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/fintrack.git
   git push -u origin main
   ```

### Step 3: Deploy to Vercel

1. Go to [vercel.com](https://vercel.com) and sign up with GitHub
2. Click "Add New Project"
3. Import your GitHub repository
4. Configure environment variables:
   - `DATABASE_URL` = your Neon connection string
   - `JWT_SECRET` = generate a random string (use: `openssl rand -base64 32`)
5. Click "Deploy"

### Step 4: Run Database Migrations

After first deploy, run Prisma migrations:

**Option A: Via Vercel CLI**
```bash
npm install -g vercel
vercel env pull .env.local
npx prisma migrate deploy
npx prisma db seed
```

**Option B: Add to build command in Vercel**
In Vercel project settings, set build command to:
```bash
prisma generate && prisma migrate deploy && next build
```

### Step 5: Set Up Custom Domain (Optional)

1. In Vercel, go to your project → Settings → Domains
2. Add your domain
3. Update DNS records as instructed
4. SSL is automatic

---

## Local Development Setup

```bash
# Clone the repo
git clone https://github.com/YOUR_USERNAME/fintrack.git
cd fintrack

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your Neon connection string and JWT secret

# Run database migrations
npx prisma migrate dev

# Seed default data (optional)
npx prisma db seed

# Start development server
npm run dev
```

Visit `http://localhost:3000`

---

## Future Enhancements (Not in V1)

- [ ] Forgot password / password reset
- [ ] Multi-factor authentication
- [ ] Recurring transactions
- [ ] Budget tracking and alerts
- [ ] Data export (CSV, PDF)
- [ ] Charts and graphs (monthly trends)
- [ ] Dark mode
- [ ] Multiple currencies
- [ ] Bank connections (Plaid)
- [ ] Mobile apps (React Native)
- [ ] Raspberry Pi self-hosting option

---

## Design Reference

See the accompanying `financial-tracker-prototype.jsx` file for a visual prototype of the UI design.
