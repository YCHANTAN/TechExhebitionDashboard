# ❖ LIFEVENT — Technical Handover & Operations Manual

> **Platform:** LIFEVENT (Lifewood Tech Exhibition Intelligence Platform)  
> **Target Audience:** Engineering Leads, DevOps Engineers, Full-Stack Developers, and IT Operations  
> **Document Version:** 1.0.0  
> **Organization:** Lifewood Data Technology  

---

## 1. Project Directory Anatomy

Below is the architectural directory breakdown of the LIFEVENT codebase:

```
TechExhebitionDashboard/
├── prisma/
│   ├── dev.db                      # SQLite relational database file
│   ├── schema.prisma               # Prisma data models & relation definitions
│   └── seed.ts                     # Database seeder (Admin, Supervisor, Intern users)
├── public/
│   ├── LIFEVENT Dark Mode.png      # High-res dark mode logo
│   ├── LIFEVENT Light Mode.png     # High-res light mode logo
│   ├── ICON_logo.png               # Square favicon/brand icon
│   ├── Logo 2.png                  # Corporate Lifewood watermark
│   ├── logo.png                    # Primary corporate Lifewood badge
│   └── Lifewood Tree.jpg           # Login background artistic photograph
├── scripts/
│   └── migrate-excel.js            # Automated spreadsheet migration utility (XLSX -> SQLite)
├── src/
│   ├── app/                        # Next.js 14 App Router
│   │   ├── (app)/                  # Authenticated portal layout & pages
│   │   │   ├── dashboard/          # Executive Analytics Dashboard
│   │   │   ├── events/             # Exhibition Catalog & [id] Dossiers
│   │   │   ├── queues/             # Multi-Tier Review & Governance Queues
│   │   │   ├── history/            # Review History & Attended Ledger
│   │   │   ├── scraper/            # Web Scraper Control Console
│   │   │   ├── reports/            # Executive Briefing & Excel Report Generator
│   │   │   ├── settings/           # System & Notification Preferences
│   │   │   └── users/              # User Management & RBAC Administration
│   │   ├── (auth)/                 # Authentication routes (/login)
│   │   ├── api/                    # Serverless API Handlers (/api/events, /api/queues, etc.)
│   │   ├── globals.css             # Tailwind base styles, color tokens & dark mode overrides
│   │   ├── layout.tsx              # Root HTML layout with providers & fonts
│   │   ├── page.tsx                # Cinematic Landing Page (/)
│   │   └── providers.tsx           # NextAuth SessionProvider & Theme wrapper
│   ├── components/
│   │   ├── dashboard/              # Analytics charts (Recharts) & KPI cards
│   │   ├── events/                 # Event forms, filter bars, tables, cards, modals
│   │   ├── landing/                # 3D Hero, Marquee, BentoGrid, BusinessLines, Navbar, Footer
│   │   ├── layout/                 # Collapsible Sidebar & Topbar
│   │   ├── shared/                 # Modals, drop-downs, language switcher, auth flythrough
│   │   └── ui/                     # Reusable UI widgets, buttons, animations
│   ├── lib/
│   │   ├── auth.ts                 # NextAuth credentials provider & JWT callbacks
│   │   ├── db.ts                   # PrismaClient singleton instance
│   │   ├── rate-limit.ts           # In-memory login attempt rate limiter
│   │   ├── constants/              # Service lines, countries, and regional dictionaries
│   │   └── reports/                # HTML executive templates & SheetJS Excel generators
│   └── stores/
│       └── locale-store.ts         # Zustand persisted store for English / 中文 i18n
├── .env.example                    # Template environment variables
├── .gitignore                      # Git exclusion rules
├── package.json                    # Project dependencies & operational scripts
├── server.js                       # Entry bridge for crawling microservice
├── server.mjs                      # Express crawling engine (Port 5000)
├── tailwind.config.ts              # Tailwind CSS theme extensions & brand colors
└── tsconfig.json                   # TypeScript compiler configuration
```

---

## 2. Environment Configuration

The application uses environment variables for session security, server networking, and external AI crawlers.

### 2.1. Environment File Setup
Create your local environment files from `.env.example`:

```bash
# 1. Frontend & Next.js API Routes
cp .env.example .env.local

# 2. Crawler Microservice Engine
cp .env.example .env
```

### 2.2. Configuration Keys Reference

| Variable | Required | Default / Example | Purpose |
| :--- | :---: | :--- | :--- |
| `DATABASE_URL` | **Yes** | `"file:./dev.db"` | Path to SQLite database file. |
| `NEXTAUTH_URL` | **Yes** | `"http://localhost:3000"` | Canonical base URL for NextAuth callbacks. |
| `NEXTAUTH_SECRET` | **Yes** | `"lifewood-super-secure-jwt-key-2026"` | 32+ character key used to sign and encrypt session JWTs. |
| `PORT` | No | `5000` | Port for the background Express crawling engine. |
| `APIFY_TOKEN` | Optional | `apify_api_xxx...` | Apify API token for live Google search crawling. |
| `GEMINI_API_KEY` | Optional | `AIzaSyDxxx...` | Google Gemini API key for structured HTML conference extraction. |

> [!IMPORTANT]
> If `NEXTAUTH_SECRET` is missing, NextAuth will throw a runtime `Configuration 500` error upon login. Always ensure a random secret string is defined in `.env.local`.

---

## 3. Local Development & Process Execution

### 3.1. Prerequisites
* **Node.js**: `18.18.0` or higher (`node -v`)
* **npm**: `9.x` or higher (`npm -v`)
* **Git**: `2.30+`

### 3.2. Initial Setup Workflow
```bash
# 1. Install dependencies
npm install

# 2. Push database schema to SQLite
npx prisma db push

# 3. Seed default system accounts (Admin, Supervisor, Intern)
npm run db:seed
```

### 3.3. Running Development Servers
LIFEVENT comprises two distinct processes:

#### Terminal 1 — Primary Next.js Application (Port 3000)
```bash
npm run dev
```
*Accessible at `http://localhost:3000`.*

#### Terminal 2 — AI Discovery Crawler Microservice (Port 5000)
```bash
npm run crawler
```
*Runs the Express service on `http://localhost:5000` for live web scraping and Apify/Gemini dispatch.*

> [!NOTE]
> Running the crawler microservice is **optional** for general dashboard viewing and event management. If the crawler is not running, the platform still functions fully using cached and existing database records.

---

## 4. Database Schema & Prisma Operations

The application leverages **Prisma ORM** with **SQLite** for ultra-lightweight, zero-configuration local persistence.

### 4.1. Key Prisma Models

```prisma
model User {
  id           Int          @id @default(autoincrement())
  email        String       @unique
  name         String?
  passwordHash String
  role         Role         @default(USER) // SUPERADMIN, ADMIN, USER
  events       Event[]
  queueItems   QueueItem[]
}

model Event {
  id                   Int          @id @default(autoincrement())
  eventNumber          Int          @unique
  eventName            String
  region               String
  country              String
  city                 String
  venue                String
  locationAddress      String?
  officialWebsite      String
  startDate            DateTime?
  endDate              DateTime?
  businessLines        String       // JSON array of strings
  strategicFocus       String?
  relevanceToLifewood  String?
  fitScore             Float        @default(1.0)
  priorityLevel        String       @default("Medium")
  isAttended           Boolean      @default(false)
  status               EventStatus  @default(PUBLISHED)
}

model QueueItem {
  id                   Int          @id @default(autoincrement())
  status               QueueStatus  @default(PENDING_REVIEW) // PENDING_REVIEW, APPROVED, REJECTED
  rejectionReason      String?
  submittedBy          User         @relation(fields: [submittedById], references: [id])
}
```

### 4.2. Database Maintenance Commands

| Command | Purpose |
| :--- | :--- |
| `npx prisma studio` | Launches Prisma's visual database browser on `http://localhost:5555`. |
| `npx prisma db push` | Synchronizes the schema with `prisma/dev.db` without migrations. |
| `npx prisma db push --force-reset` | Wipes the SQLite database clean. *(Use with caution).* |
| `npm run db:seed` | Re-seeds default system accounts. |
| `npm run db:migrate-excel` | Runs `scripts/migrate-excel.js` to ingest spreadsheet data. |

### 4.3. Database Backup & Restore
* **Backup**: Make a copy of `prisma/dev.db`:
  ```bash
  cp prisma/dev.db prisma/dev.db.backup_$(date +%Y%m%d)
  ```
* **Restore**: Replace `prisma/dev.db` with your backup file and restart the Next.js process.

---

## 5. Production Deployment Guide

### Option A: Vercel (Recommended for Frontend & API Routes)
1. Import the GitHub repository into your Vercel team dashboard.
2. Under **Environment Variables**, set:
   * `NEXTAUTH_URL`: Your Vercel production domain (e.g., `https://lifevent.vercel.app`).
   * `NEXTAUTH_SECRET`: A secure 32-character key.
3. If switching from SQLite to cloud PostgreSQL (Supabase, Neon, AWS RDS):
   * In `prisma/schema.prisma`, change `provider = "sqlite"` to `provider = "postgresql"`.
   * Update `DATABASE_URL` to your PostgreSQL connection string (`postgres://...`).
   * Run `npx prisma db push`.
4. Deploy the project.

### Option B: Self-Hosted Docker / Linux VPS
1. **Build the Next.js Application**:
   ```bash
   npm run build
   ```
2. **Start with PM2 Process Manager**:
   ```bash
   # Install PM2 globally
   npm install -g pm2

   # Start Next.js App on Port 3000
   pm2 start npm --name "lifevent-app" -- start

   # Start Crawler Microservice on Port 5000
   pm2 start server.js --name "lifevent-crawler"

   # Persist PM2 across reboots
   pm2 save
   pm2 startup
   ```
3. **Configure Nginx Reverse Proxy**:
   Point port 80/443 to `http://127.0.0.1:3000`.

---

## 6. Common Troubleshooting & FAQ

### Q1: `NextAuth: Configuration 500` Error on Login
* **Root Cause**: `NEXTAUTH_SECRET` or `NEXTAUTH_URL` is undefined in the environment.
* **Resolution**: Ensure `.env.local` contains `NEXTAUTH_SECRET="your-secret-key"` and restart `npm run dev`.

### Q2: Rate Limit Locked Account (`TOO_MANY_ATTEMPTS`)
* **Root Cause**: A user entered incorrect credentials 5 consecutive times.
* **Resolution**: The system applies a 60-second cooldown window. Wait 60 seconds or restart the Node server process (which clears in-memory rate-limit trackers).

### Q3: `Port 3000 or 5000 is already in use`
* **Resolution**:
  ```powershell
  # Windows PowerShell:
  Get-Process -Id (Get-NetTCPConnection -LocalPort 3000).OwningProcess | Stop-Process
  Get-Process -Id (Get-NetTCPConnection -LocalPort 5000).OwningProcess | Stop-Process
  ```

### Q4: Resetting an Administrator Password
If an admin password is forgotten, run this one-line command to reset `admin@lifewood.com` back to `admin123`:
```bash
node -e "const bcrypt = require('bcryptjs'); const { PrismaClient } = require('@prisma/client'); const prisma = new PrismaClient(); bcrypt.hash('admin123', 10).then(hash => prisma.user.update({ where: { email: 'admin@lifewood.com' }, data: { passwordHash: hash } }).then(() => { console.log('Admin password reset to admin123'); process.exit(0); }));"
```

---

## 7. Handover Sign-Off & Contacts

* **Original Author & Maintainer**: Lifewood Engineering Team
* **Primary Branch**: `main`
* **Repository**: [`https://github.com/Zycheee/TechExhebitionDashboard`](https://github.com/Zycheee/TechExhebitionDashboard)
