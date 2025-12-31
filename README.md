# Piggy - Personal Financial Tracker

A modern, full-stack financial tracking application built with Next.js 15, TypeScript, Prisma, and PostgreSQL.

## Features

- **User Authentication**: Secure signup/login with JWT and bcrypt
- **Dashboard**: Overview of total balance, monthly income, and expenses
- **Transaction Management**: Add, edit, delete, and filter transactions
- **Category Management**: Organize transactions with customizable categories
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Beautiful UI**: Modern interface with Tailwind CSS

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Database**: PostgreSQL (Neon)
- **ORM**: Prisma
- **Styling**: Tailwind CSS
- **Authentication**: Custom (bcrypt + JWT)
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18+ installed
- PostgreSQL database (we recommend [Neon](https://neon.tech) for easy setup)
- npm or yarn package manager

### Installation

1. **Clone the repository** (or you're already in it!)

```bash
cd financial_tracker
```

2. **Install dependencies**

```bash
npm install
```

3. **Set up environment variables**

Copy the example environment file:

```bash
cp .env.example .env.local
```

Edit `.env.local` and add your values:

```env
# Get this from your Neon dashboard
DATABASE_URL="postgresql://username:password@host/database?sslmode=require"

# Generate a secure random string (run: openssl rand -base64 32)
JWT_SECRET="your-secret-key-here"

# App URL
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

4. **Set up the database**

Run Prisma migrations to create the database tables:

```bash
npx prisma migrate dev --name init
```

Generate the Prisma client:

```bash
npx prisma generate
```

5. **Start the development server**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser!

## Database Setup with Neon

1. Go to [neon.tech](https://neon.tech) and sign up
2. Create a new project
3. Copy the connection string from the dashboard
4. Paste it into your `.env.local` file as `DATABASE_URL`
5. Run the migrations (step 4 above)

## Project Structure

```
financial_tracker/
├── app/                      # Next.js app directory
│   ├── (auth)/              # Auth pages (login, signup)
│   ├── (dashboard)/         # Protected dashboard pages
│   ├── api/                 # API routes
│   └── layout.tsx           # Root layout
├── components/              # React components
│   ├── ui/                  # Reusable UI components
│   ├── layout/              # Layout components
│   ├── dashboard/           # Dashboard components
│   ├── transactions/        # Transaction components
│   └── categories/          # Category components
├── lib/                     # Utility functions
│   ├── prisma.ts           # Prisma client
│   ├── auth.ts             # Authentication utilities
│   └── utils.ts            # Helper functions
├── prisma/                  # Prisma schema and migrations
│   ├── schema.prisma       # Database schema
│   └── seed.ts             # Database seeding
└── types/                   # TypeScript type definitions
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Create new account
- `POST /api/auth/login` - Login
- `POST /api/auth/logout` - Logout
- `GET /api/auth/me` - Get current user

### Transactions
- `GET /api/transactions` - List transactions (with filters)
- `POST /api/transactions` - Create transaction
- `GET /api/transactions/[id]` - Get single transaction
- `PUT /api/transactions/[id]` - Update transaction
- `DELETE /api/transactions/[id]` - Delete transaction

### Categories
- `GET /api/categories` - List categories
- `POST /api/categories` - Create category
- `PUT /api/categories/[id]` - Update category
- `DELETE /api/categories/[id]` - Delete category

### Summary
- `GET /api/summary` - Dashboard statistics

## Usage

1. **Sign Up**: Create a new account on the signup page
2. **Login**: Access your dashboard
3. **Add Transactions**: Click the "Add Transaction" button to record income or expenses
4. **Manage Categories**: Visit the Categories page to customize your categories
5. **View Dashboard**: See your financial overview with charts and recent transactions
6. **Filter Transactions**: Use filters on the Transactions page to view specific time periods

## Default Categories

When you create an account, these categories are automatically created:

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

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npx prisma studio` - Open Prisma Studio (database GUI)
- `npx prisma migrate dev` - Create and apply migrations

### Database Management

View and edit your database with Prisma Studio:

```bash
npx prisma studio
```

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) and import your repository
3. Add environment variables in Vercel dashboard:
   - `DATABASE_URL`
   - `JWT_SECRET`
4. Deploy!

Vercel will automatically build and deploy your app.

## Future Enhancements

- [ ] Password reset functionality
- [ ] Profile editing
- [ ] Account deletion
- [ ] Recurring transactions
- [ ] Budget tracking
- [ ] Data export (CSV/PDF)
- [ ] Charts and graphs
- [ ] Dark mode
- [ ] Multi-currency support

## License

This project is open source and available under the MIT License.

## Support

For issues or questions, please open an issue on GitHub.
