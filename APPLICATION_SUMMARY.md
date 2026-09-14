# Lifewood Tech Exhibition Intelligence Platform
## Comprehensive Application Summary & Architecture Overview

> **Version:** 1.0.0  
> **Target Enterprise:** Lifewood Data Technology  
> **Stack:** Next.js 14 (App Router) · TypeScript · Tailwind CSS · Prisma ORM · NextAuth.js · SQLite / PostgreSQL  

---

## 1. Executive Summary & Purpose

The **Lifewood Tech Exhibition Intelligence Platform** is an enterprise intelligence portal built for **Lifewood Data Technology**. The application tracks, crawls, structures, audits, evaluates, and reports on global technology exhibitions and industrial conferences from September 1, 2026 through December 31, 2027.

The platform aligns global event discovery with Lifewood's six core commercial and AI data service lines, providing executive leaders, business development managers, and data annotation teams with real-time market visibility, strategic fit scoring, gap detection, review queues, and branded reporting.

---

## 2. Strategic Alignment & Core Business Lines

Every exhibition in the system is audited and mapped against Lifewood's core service offerings:

| Business Line | Strategic Relevance & Buyer Profile | Focus Keyword & Themes |
|---|---|---|
| **Global AI Data** | Multilingual speech, text, image, and multimodal data collection and annotation at global scale. | LLM training data, multilingual corpus, data labeling, RLHF. |
| **AIGC** | Generative AI prompt engineering, red teaming, synthetic data generation, and foundation model safety. | Generative AI, foundational models, AI safety, prompt tuning. |
| **Global Scanning + Indexing** | Enterprise document digitization, ultra-high-volume scanning, OCR transcription, archival cataloging. | Digital archiving, OCR, document intelligence, historical indexing. |
| **Autonomous Driving** | 2D/3D sensor fusion, point cloud / LiDAR segmentation, bounding boxes, HD mapping, and AV edge telemetry. | ADAS, LiDAR, sensor fusion, computer vision, autonomous vehicles. |
| **AEO / GEO** | Answer Engine Optimization and Generative Engine Optimization for modern conversational search architectures. | AI search, conversational indexing, knowledge retrieval, RAG. |
| **EDGE Intelligence** | Low-latency inference, embedded vision, IoT sensors, and on-device machine learning models. | Edge computing, smart sensors, robotics, embedded systems. |

---

## 3. Technology Stack & Architecture

```
┌──────────────────────────────────────────────────────────────────┐
│                   Next.js 14 App Router UI                       │
│  Tailwind CSS · Lucide Icons · Recharts · Zustand (EN/ZH)        │
└─────────────────────────────────┬────────────────────────────────┘
                                  │ Server Actions & REST API
┌─────────────────────────────────▼────────────────────────────────┐
│                   Next.js Route Handlers                         │
│  /api/dashboard · /api/events · /api/queues · /api/reports       │
└──────────────────┬───────────────────────────────┬───────────────┘
                   │                               │
┌──────────────────▼───────────┐      ┌────────────▼───────────────┐
│          Prisma ORM          │      │   AI Scraper Microservice  │
│ SQLite (Dev) / Postgres (Prd)│      │  Apify + Google Gemini 2.5 │
└──────────────────────────────┘      └────────────────────────────┘
```

* **Frontend Framework:** Next.js 14 (App Router) using React Server Components (RSC) and interactive Client Components.
* **Type Safety:** 100% strict TypeScript typing across UI schemas, database queries, and API payload contracts.
* **Styling & Theming:** Custom Tailwind CSS configuration featuring Lifewood's corporate palette:
  * Dark Serpent (`#133020`)
  * Castleton Green (`#046241`)
  * Warm Saffron (`#FFB347` / `#FACC15`)
  * Card Paper / Neutral Stone (`#D8D2C8`, `#F5EEDB`)
* **State & Localization:** Zustand store supporting live hot-swapping between English (`EN`) and Simplified Chinese (`中文`).
* **Authentication & Security:** NextAuth.js with JWT session strategy, bcrypt password hashing, and role-based access control (RBAC).
* **Database & Persistence:** Prisma ORM managing structured relational models for `Event`, `QueueItem`, `User`, and `Account`.

---

## 4. Key Modules & Functional Capabilities

### 4.1. Executive Intelligence Dashboard (`/dashboard`)
* **Real-Time KPI Counters:**
  * **Total Exhibitions:** Count of verified, active records in the database.
  * **2027 Forward Pipeline:** Count of forward-looking exhibitions planned for 2027.
  * **Average Fit Score:** Aggregate strategic fit rating out of 5.0.
  * **Global Regions Covered:** Regional spread spanning APAC, North America, Europe, and the Middle East.
* **Exhibitions Distribution by Month:** Interactive Recharts bar chart with date-range pickers and saffron highlights for coverage gap months (< 5 events).
* **Business Line Distribution Chart:** Horizontal bar visualization showing exhibition volume across Lifewood's 6 core service lines.
* **Events by Region Chart:** Doughnut chart detailing geographic concentration.
* **Coverage Gap Assessment Widget:** Real-time indicator identifying months, regions, or business lines needing sourcing outreach.
* **Recently Added Exhibitions:** Quick-reference visual cards showcasing recently verified events with direct links to full specifications.
* **Scraper Engine Status Widget:** Operational monitoring block showing last execution time, discovery count, and next scheduled run.

### 4.2. Exhibition Records Catalog (`/events`)
* **Dual View Modes:** Instant toggle between visual Card Grid and dense Tabular Audit format.
* **Multi-Parameter Filter Toolbar:** Search by keyword, region, business line, minimum fit score (1–5), and priority level (Critical, High, Medium, Low).
* **Add Event Workflow:** Interactive modal (`ModalPortal`) with strict validation across Groups A through E fields. Submissions automatically enter the review queue for governance audit.
* **Record Deletion Protection:** High-contrast `DeleteEventModal` ensuring destructive actions are confirmed explicitly.

### 4.3. Single Event Detail & Map View (`/events/[id]`)
* **Detailed Parameter Audit:** Displays complete event details including dates, venue, organizers, target audience, estimated attendees, sponsorship tiers, and registration deadlines.
* **Google Maps Integration:** Direct address geolocation with one-click CTA to open the exact coordinates in Google Maps.
* **Official Website Redirection:** High-contrast, validated URLs directing users to the official conference website.
* **Attendance Workflow:** "Mark as Attended" action that immediately updates status, displays user feedback, and routes the record to the permanent Attended Log (`/history?tab=ATTENDED`).

### 4.4. AI Scraper Engine (`/scraper`)
* **Automated Discovery:** Microservice leveraging Apify Google Search crawling combined with Google Gemini Flash for deep semantic extraction.
* **Interactive Crawler Dashboard:** Real-time query submission, elapsed stopwatch, and continuous Server-Sent Events (SSE) status stream.
* **Deduplication & Quality Control:** Automated pre-screening identifying existing entries and flagging duplicate records.
* **Staging Area:** One-click review to accept unique records directly into the supervisor review queue or dismiss irrelevant items.

### 4.5. Review & Governance Queues (`/queues`)
* **Approval Pipeline:** Central workflow for Supervisors and Admins to review intern drafts, AI crawler discoveries, and data correction requests.
* **Clickable Queue Cards:** In-depth pop-up modals showing complete specification fields before taking action.
* **Actionable Controls:** One-click **Approve** (commits record to active catalog) or **Reject** (removes record with audit rationale logging).

### 4.6. Governance & Attendance History (`/history`)
* **Tab 1 — Queue Decisions Log:** 30-day auto-clearing historical audit log of all supervisor approvals and rejections.
* **Tab 2 — Attended Exhibitions Archive:** Permanent archive of all exhibitions where Lifewood attended or exhibited. Includes view and delete-only management privileges.

### 4.7. Executive Report Generator (`/reports`)
* **Custom Scopes:** Filter by Region (Asia, North America, Europe, Middle East, Global), Business Line, or Full Database Export.
* **Time Range Flexibility:** Full 2026–2027 period, specific calendar years, quarters (Q1–Q4), half-years (H1–H2), or custom date ranges.
* **Export Formats:**
  * **Lifewood Branded HTML:** Executive-styled Hong Kong report with live in-browser preview and print-to-PDF formatting.
  * **Multi-Tab Excel (.xlsx):** Structured workbook with styled summary tables and raw audit data.
  * **Raw CSV Spreadsheet:** Standard CSV data stream for business intelligence pipelines.

### 4.8. User Management & System Settings (`/users`, `/settings`)
* **Account Administration:** Creation, role assignment, and management of platform users.
* **Security & Governance:** Secure administrator password change tools and live RBAC capability matrices.

---

## 5. Role-Based Access Control (RBAC) Matrix

| Platform Permission | Admin | Supervisor | Intern |
|---|:---:|:---:|:---:|
| **View Dashboard, Catalog & Reports** | ✅ Full Access | ✅ Full Access | ✅ Read Only |
| **Submit Event to Review Queue** | ✅ | ✅ | ✅ |
| **Approve / Reject Review Queue Items** | ✅ | ✅ | ❌ |
| **Publish Event Directly (Bypass Queue)** | ✅ | ✅ | ❌ |
| **Trigger Live Scraper Engine** | ✅ | ✅ | ❌ |
| **Mark Event as Attended** | ✅ | ✅ | ❌ |
| **Delete Records Permanently** | ✅ | ❌ | ❌ |
| **Manage User Accounts & Roles** | ✅ | ❌ | ❌ |

---

## 6. Project Directory Structure

```
TechExhebitionDashboard/
├── prisma/
│   ├── schema.prisma              # Prisma database schema definition
│   └── dev.db                     # Local SQLite database
├── public/                        # Static assets, logos, brand vectors
├── src/
│   ├── app/
│   │   ├── (app)/                 # Authenticated application shell
│   │   │   ├── dashboard/         # Dashboard analytics view
│   │   │   ├── events/            # Exhibition catalog and [id] views
│   │   │   ├── history/           # Queue decisions & attended logs
│   │   │   ├── queues/            # Supervisor review pipeline
│   │   │   ├── reports/           # Executive report generator
│   │   │   ├── scraper/           # Scraper engine interface
│   │   │   ├── settings/          # System configuration & security
│   │   │   └── users/             # User administration
│   │   ├── (auth)/login/          # NextAuth login page
│   │   └── api/                   # Server API route endpoints
│   ├── components/
│   │   ├── dashboard/             # Charts, metrics cards, widgets
│   │   ├── events/                # Modals, event forms, badges, chips
│   │   ├── layout/                # Sidebar, topbar, navigation
│   │   ├── shared/                # Dropdowns, portals, skeletons
│   │   └── ui/                    # Living wood animated backgrounds
│   ├── lib/                       # Constants, i18n dictionaries, utils
│   └── stores/                    # Zustand locale store
├── APPLICATION_SUMMARY.md         # Application architecture document
├── REPORTING_GUIDE.md             # Executive reporting documentation
└── README.md                      # Quickstart and run instructions
```
