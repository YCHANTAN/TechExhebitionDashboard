# ❖ LIFEVENT — Global Tech Exhibition Intelligence Platform

> **Brand:** LIFEVENT  
> **Platform:** Full-Stack Next.js 14 (App Router) + TypeScript + Tailwind CSS + Prisma ORM + NextAuth.js  
> **Organization:** Lifewood Data Technology  
> **Version:** 1.2.0  

---

## 📖 Executive Summary & Purpose

**LIFEVENT** is a centralized business intelligence and exhibition sourcing platform developed specifically for **Lifewood Data Technology**. The platform systematically discovers, crawls, audits, scores, and visualizes global technology exhibitions and industrial summits aligned with Lifewood’s six strategic business pillars:

* **Global AI Data Annotation & RLHF Fine-Tuning**
* **AIGC, Generative AI & Red Teaming Datasets**
* **Autonomous Driving (3D LiDAR, Radar & Spatial Vision Data)**
* **Answer-Engine Optimization (AEO) & Generative Engine Optimization (GEO)**
* **EDGE Intelligence, IoT & Embedded Vision**
* **High-Volume Document Scanning, OCR & Catalog Indexing**

The platform provides BD leadership, global delegates, and executive management with forward pipeline visibility, strategic fit scoring (1.0–5.0 scale), multi-tier review governance, automated web crawling via Apify + Gemini, board-level briefing exports, and granular role-based access control.

---

## 🎨 Design System & Theme Architecture

LIFEVENT features an adaptive dual-theme design system engineered for high legibility and contrast:

### ☀️ Light Mode
* **Canvas Body**: Pure White (`#FFFFFF` / `bg-white`) providing a clean, modern SaaS aesthetic.
* **Header Navigation**: Frosted **Sea Salt** (`#F9F7F7` at 85% opacity) with liquid glassmorphism (`backdrop-blur-xl`), accompanied by subtle neutral borders (`border-gray-200`).
* **Cards & Surfaces**: Crisp solid white containers with refined shadows and subtle borders to establish clear visual depth over the canvas.

### 🌙 Dark Mode
* **Canvas Body**: True **Black** (`#000000` / `bg-black`), eliminating muddy green tones for a sleek OLED appearance.
* **Cards & Surfaces**: Elevated Zinc-950 (`dark:bg-zinc-950`) panels bordered by semi-transparent white boundaries (`dark:border-white/10` to `dark:border-white/15`).
* **Accents**: High-contrast Saffron Gold (`#FFB347`) highlights and Emerald badges for fit scores and status indicators.

---

## 🛠️ Technology Stack

| Layer | Technology | Purpose |
|---|---|---|
| **Framework** | Next.js 14.2 (App Router) | SSR, React Server Components & client SPA transitions |
| **Language** | TypeScript 5.x | Strict type safety across client, database models & API routes |
| **Styling** | Tailwind CSS 3.4 + Lucide Icons | Responsive layout, theme variables & custom iconography |
| **State & i18n** | Zustand 4.5 | Global client store, theme persistence & instant EN / 中文 switching |
| **Database & ORM** | Prisma 5.x + SQLite | Relational schema, automated migrations & type-safe queries |
| **Authentication** | NextAuth.js 4.24 | JWT session strategy, credential provider & role middleware |
| **Visualizations** | Recharts 2.12 | Monthly distribution bars, regional breakdowns & fit score meters |
| **Excel Ingestion** | XLSX (SheetJS) | Data parsing from `Tech Exhibitions 2026.xlsx` into database |
| **Microservice** | Express + Apify + Gemini | Real-time web crawling and AI structured extraction |

---

## ✨ Core Features & Platform Modules

### 🌐 1. Cinematic Landing Page (`/`)
* **Interactive 3D Tilt Hero**: Live dashboard mockup with interactive tabs (Preview, Signals, Fit Score Breakdown).
* **Live Exhibition Marquee**: Continuously scrolling ticker showcasing global summits (CES, MWC, AutoSens, Embedded World) with click-to-inspect modal dossiers.
* **Interactive Scroll Text Reveal**: Dynamic paragraph highlighting Lifewood's core mission upon viewport scroll.
* **Signature 4-Card Bento Grid**: Highlighting AI Discovery, 6-Service Strategic Fit Scoring, Global Footprint (38+ Countries), and Data Governance (99.8% accuracy).
* **6 Business Lines Filter Showcase**: Interactive service selector displaying matched event counts, average fit scores, and target conference pills.
* **Step-by-Step Interactive Timeline**: 3-step connected workflow visualizer from web discovery to board-level reporting.
* **High-Impact CTA**: Instant access triggers to the Intelligence Portal and exhibitions directory.

### 📊 2. Executive Intelligence Dashboard (`/dashboard`)
* **KPI Metrics Grid**: Live counters for Total Exhibitions, Forward Pipeline, Average Fit Score, and Global Regions.
* **Monthly Distribution Chart**: Monthly cadence bar chart with period filters and high-contrast tooltips.
* **Business Line Distribution Chart**: Horizontal bar chart mapping events across Lifewood's 6 core offerings.
* **Regional Breakdown**: Visual doughnut chart mapping events across APAC, North America, EMEA, and LATAM.
* **Coverage Gap Alerts**: Automated identification of months with sparse high-fit opportunities.
* **Recently Added Exhibitions**: 5 latest verified events with prominent fit score badges.

### 🗂️ 3. Exhibition Catalog & Specification (`/events`)
* **Card & Table Switcher**: Toggle between responsive grid cards and data-dense tables.
* **Multi-Criteria Filter Bar**: Search by keyword, region, business line, minimum fit score, and pricing model.
* **Interactive Add Event Modal**: Attached via React Portal with smooth scale animations.
* **Single Event Specification (`/events/[id]`)**: Detailed 27-column breakdown, Google Maps location integration, attendee tiers, official website links, and "Mark as Attended" workflow.

### ⚡ 4. Cinematic Post-Authentication Transition
* **Fluid Flythrough Animation**: Smooth ~1s logo zoom transition seamlessly introducing the dashboard upon user login, without jarring loading spinners.

### 🤖 5. AI Scraper Control Engine (`/scraper`)
* **Web Crawler Trigger**: One-click integration with the crawling engine.
* **Staging Review Table**: Inspect AI confidence scores before promoting leads to the governance queue.

### 📥 6. Governance & Review Queues (`/queues`)
* **Double-Blind Verification**: Multi-tier review workflow for drafted or AI-discovered exhibitions.
* **Approval & Rejection Controls**: Admins and Supervisors can inspect all 27 technical parameters before publishing.

### 📜 7. Attendance & Governance History (`/history`)
* **Review History Tab**: 30-day auto-maintained log of all approved and rejected queue items.
* **Attended Exhibitions Log**: Permanent ledger of conferences attended by Lifewood delegates.

### 👥 8. RBAC & User Management (`/users`)
* **Role Permissions**:
  * **`ADMIN` / `SUPERADMIN`**: Full permissions (manage users, create/edit/delete events, adjust settings).
  * **`SUPERVISOR`**: Edit records, approve/reject review queues, generate reports.
  * **`INTERN`**: Submit draft records, trigger scrapers, browse catalog.

---

## ⚡ Quick Start & Local Setup

### 📋 Prerequisites
* **Node.js**: `18.18.0` or higher
* **npm**: `9.x` or higher
* **Git**

---

### 1️⃣ Clone & Install
```bash
git clone https://github.com/Zycheee/TechExhebitionDashboard.git
cd TechExhebitionDashboard
npm install
```

### 2️⃣ Environment Configuration
Copy `.env.example` to create your local environment files:
```bash
# Next.js App
cp .env.example .env.local

# Optional crawler service
cp .env.example .env
```

Ensure `NEXTAUTH_SECRET` and `NEXTAUTH_URL` are set in `.env.local`:
```env
NEXTAUTH_SECRET="lifewood-super-secure-jwt-key-2026"
NEXTAUTH_URL="http://localhost:3000"
```

### 3️⃣ Initialize Database & Migrate 2026 Exhibitions
```bash
# Initialize SQLite database schema
npx prisma db push

# Seed system roles & users (Admin, Supervisor, Intern)
npm run db:seed

# Migrate all 222 exhibitions from 'Tech Exhibitions 2026.xlsx'
npm run db:migrate-excel
```

### 4️⃣ Start Development Server
```bash
npm run dev
```
Open **`http://localhost:3000`** in your browser.

*(Optional)* To run the live web crawler microservice:
```bash
npm run crawler
```

### 5️⃣ Production Build
```bash
npm run build
npm run start
```

---

## 🔑 Default Credentials

| Role | Email | Password | Access Level |
|---|---|---|---|
| **Admin** | `admin@lifewood.com` | `admin123` | Full system governance, users & events |
| **Supervisor** | `supervisor@lifewood.com` | `supervisor123` | Review queues, reports & edits |
| **Intern** | `intern@lifewood.com` | `intern123` | Draft submissions & exploration |

---

## 📦 Available Scripts

* **`npm run dev`**: Starts Next.js development server on `http://localhost:3000`.
* **`npm run build`**: Compiles optimized production build with zero type errors.
* **`npm run start`**: Starts Next.js in production mode.
* **`npm run db:seed`**: Seeds default user accounts.
* **`npm run db:migrate-excel`**: Extracts and loads all 222 events from `Tech Exhibitions 2026.xlsx` into the database.
* **`npm run crawler`**: Launches the background crawling microservice on port `5000`.

---

## 🔒 Security & Data Integrity

* **Password Security**: Passwords hashed using `bcrypt` (10 rounds).
* **Token Protection**: JWT sessions signed and verified with `NEXTAUTH_SECRET`.
* **RBAC Guard**: Server-side role enforcement on all mutation endpoints (`POST`, `PUT`, `DELETE`).
* **Source Tracking**: All 222 imported events preserve original source spreadsheet provenance.

---

## 🛡️ License

Copyright © 2026 **Lifewood Data Technology**. All rights reserved.
