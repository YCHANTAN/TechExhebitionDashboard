# ❖ LIFEVENT — System Workflow & Operational Pipelines

> **Platform:** LIFEVENT (Lifewood Tech Exhibition Intelligence Platform)  
> **Target Audience:** Engineering, Product, Operations, and Business Development Teams  
> **Document Version:** 1.0.0  
> **Organization:** Lifewood Data Technology  

---

## 1. Overview of Platform Workflows

The LIFEVENT architecture orchestrates six core operational workflows that manage the journey of an exhibition from raw internet signal to verified executive decision:

```mermaid
flowchart LR
    W1["1. Automated AI Crawling"] --> W3["3. Review & Governance"]
    W2["2. Manual Sourcing"] --> W3
    W3 --> W4["4. Strategic Fit Scoring"]
    W4 --> W5["5. Lifecycle & Attendance"]
    W5 --> W6["6. Executive Reporting"]
```

---

## 2. Pipeline 1: Automated AI Discovery & Web Crawling

The automated crawler identifies new tech conferences across global convention centers, official organizer listings, and industry calendars.

```mermaid
sequenceDiagram
    autonumber
    actor Admin as Operations Supervisor
    participant UI as Scraper Console (/scraper)
    participant Server as Next.js API (/api/scraper/*)
    participant Crawler as Express Microservice (:5000)
    participant Apify as Apify Google Search Crawler
    participant Gemini as Google Gemini 1.5 Flash
    participant DB as SQLite (dev.db)

    Admin->>UI: Select Tier Targets & Click "Run Crawler"
    UI->>Server: POST /api/scraper/run { query, limit }
    Server->>Crawler: Trigger crawl job via HTTP RPC
    Crawler->>Apify: Dispatch targeted search queries
    Apify-->>Crawler: Return raw organic search URLs & HTML
    Crawler->>Gemini: Stream HTML blocks for structured NLP extraction
    Note over Gemini: Extracts dates, venue, organizers, booth tiers & Lifewood relevance
    Gemini-->>Crawler: Structured 27-field JSON
    Crawler->>DB: Write to ScrapedEvent staging table
    Crawler-->>Server: Stream SSE progress & completion status
    Server-->>UI: Update Staging Review Table
    Admin->>UI: Review items & Click "Accept to Queue"
    UI->>Server: POST /api/scraper/accept { eventId }
    Server->>DB: Insert into QueueItem (status: PENDING_REVIEW)
```

### Crawling Rules & Deduplication Logic
1. **URL Fingerprinting**: Event URLs are normalized (stripping tracking query parameters like `utm_*`, `ref`, `fbclid`).
2. **Name & Year Fuzzy Matching**: If an event with the same normalized name and calendar year exists in the catalog, it is flagged with a `DUPLICATE_SUSPECT` warning badge.
3. **Staging Review Isolation**: Raw scraper output never touches the active exhibition catalog directly. Every scraped entry must be accepted into the review queue.

---

## 3. Pipeline 2: Manual Event Sourcing & Queue Submission

When human researchers or BD representatives identify proprietary or invite-only exhibitions, they input records manually.

```mermaid
flowchart TD
    A["Researcher accesses /events"] --> B["Click '+ Add Exhibition' Button"]
    B --> C["Open Add Event Modal (React Portal z-[99999])"]
    C --> D["Fill 27-Field Schema (Groups A–E)"]
    D --> E{"Form Validation Check"}
    E -- Errors Found --> F["Highlight fields in red (border-rose-500) & display Error Summary Box"]
    F --> D
    E -- Valid --> G["Submit Form (POST /api/events)"]
    G --> H["Create QueueItem with status: PENDING_REVIEW"]
    H --> I["Display Success Toast & Redirect to /queues"]
```

### Required Field Groups
* **Group A — Identity**: Event Name, Region, Country, City, Category.
* **Group B — Timing**: Human Dates (e.g. `Apr 6–9, 2026`), Start Date (`YYYY-MM-DD`), End Date (`YYYY-MM-DD`).
* **Group C — Venue & Coordinates**: Venue Name, Full Street Address (enables Google Maps link), Official Website.
* **Group D — Strategic Alignment**: Business Lines (multiple selection), Strategic Focus, Relevance to Lifewood, Fit Score (1–5), Priority Level.
* **Group E — Commercials**: Estimated Attendees, Booth Pricing, Registration Deadline, Contact Email/Person.

---

## 4. Pipeline 3: Multi-Tier Review & Governance Workflow

Every exhibition must pass through supervisor verification before appearing on executive dashboards.

```mermaid
stateDiagram-v2
    [*] --> PENDING_REVIEW: Ingested via AI Crawler or Researcher Draft
    
    state PENDING_REVIEW {
        [*] --> InQueue
        InQueue --> InspectingDetails: Supervisor clicks card to open 27-Column Modal
        InspectingDetails --> InQueue: Close modal
    }

    PENDING_REVIEW --> PUBLISHED: Supervisor clicks "APPROVE"
    PENDING_REVIEW --> REJECTED: Supervisor clicks "REJECT" (Rationale required)

    state PUBLISHED {
        [*] --> ActiveInCatalog
        ActiveInCatalog --> MarkedAttended: Delegate marks "Attended"
    }

    state REJECTED {
        [*] --> StoredInReviewHistory
        StoredInReviewHistory --> AutoPurged: 30-Day Auto-Clear Policy
    }

    MarkedAttended --> PermanentArchive: Preserved in /history?tab=ATTENDED
```

### Governance Controls
1. **One-Click Audit Modal**: Clicking any Queue Card launches a full specification modal detailing all commercial, geographic, and relevance fields.
2. **Audit Provenance**: Every approval or rejection permanently records the `reviewerId`, timestamp, and rejection rationale.
3. **30-Day Retention**: Approved and rejected review history items are archived for 30 days before automatic cleanup to keep queues performant.

---

## 5. Pipeline 4: Strategic Fit Scoring Algorithm

The Strategic Fit Score (1.0 to 5.0) quantifies how well an exhibition justifies commercial sponsorship and delegate travel.

```mermaid
graph TD
    subgraph Inputs ["Evaluation Vectors"]
        V1["Vector 1: Service Line Alignment (Weight: 35%)"]
        V2["Vector 2: Buyer & Decision-Maker Seniority (Weight: 25%)"]
        V3["Vector 3: Commercial & Sponsor ROI Tiers (Weight: 20%)"]
        V4["Vector 4: Keynote Tracks & Tech Theme (Weight: 20%)"]
    end

    subgraph Calculation ["Scoring Calibration"]
        Formula["Weighted Sum = (V1 * 0.35) + (V2 * 0.25) + (V3 * 0.20) + (V4 * 0.20)"]
    end

    subgraph TierOutput ["Score Tiers & Recommendations"]
        Tier5["Score 5.0 (Mandatory Exhibit — Major Board Priority)"]
        Tier4["Score 4.0–4.9 (High Fit — Delegate Attendance Recommended)"]
        Tier3["Score 3.0–3.9 (Moderate Fit — Selective Sourcing Opportunity)"]
        Tier2["Score 1.0–2.9 (Low Fit — Catalog Only / Passive Monitoring)"]
    end

    Inputs --> Calculation
    Calculation --> TierOutput
```

### Fit Score Tiers Breakdown

| Fit Score | Tier Level | Action Recommendation | Typical Characteristics |
| :---: | :--- | :--- | :--- |
| **`5.0`** | **Tier 1: Strategic Must-Attend** | **Exhibit & Sponsor** | High alignment with ≥ 3 core service lines, C-level attendees (> 10,000+), dedicated AI/Autonomous tracks. |
| **`4.0 – 4.9`** | **Tier 2: High Value** | **Send Delegate** | Strong alignment with 1–2 service lines, high enterprise buyer ratio, direct lead-generation opportunities. |
| **`3.0 – 3.9`** | **Tier 3: Niche / Targeted** | **Monitor / Virtual** | Regional convention or adjacent industry expo (e.g. lighting, general electronics) with isolated AI tracks. |
| **`1.0 – 2.9`** | **Tier 4: Low Alignment** | **Ignore / Archive** | General consumer expo or academic symposium with negligible commercial buyer interest for data labeling. |

---

## 6. Pipeline 5: Event Lifecycle & Attendance Archiving

Once published, exhibitions enter the active tracking lifecycle.

```mermaid
sequenceDiagram
    autonumber
    actor Delegate as Lifewood BD Delegate
    participant App as Events Catalog (/events)
    participant Modal as Single Event Dossier (/events/[id])
    participant API as API Route (/api/events/[id])
    participant Hist as Attended Archive (/history?tab=ATTENDED)

    Delegate->>App: Browse 2026/2027 Calendar
    Delegate->>Modal: Open Target Event (e.g., InnoEX 2026)
    Note over Modal: Delegate reviews venue, dates & official website
    Delegate->>Modal: Click "Mark as Attended"
    Modal->>API: PATCH /api/events/[id] { isAttended: true, attendedDate }
    API-->>Modal: Success Response
    Modal-->>App: Toast Notification "Marked as Attended!"
    App->>Hist: Instant redirect to Attended History Log
    Note over Hist: Event is permanently stored in historical institutional knowledge base
```

---

## 7. Pipeline 6: Executive Reporting & Export Workflow

Leadership requires board-ready documentation for conference travel approvals and marketing budget allocations.

```mermaid
flowchart TD
    A["Executive visits /reports"] --> B["Select Report Parameters"]
    B --> C{"Choose Report Scope"}
    C -->|By Region| D["Filter by APAC, North America, Europe, etc."]
    C -->|By Business Line| E["Filter by AI Data, Autonomous Driving, etc."]
    C -->|Complete Calendar| F["Include all 500+ exhibitions"]
    
    D --> G["Generate Live Preview in IFrame"]
    E --> G
    F --> G

    G --> H{"Choose Export Format"}
    H -->|HTML Executive Briefing| I["Download Board-Ready HTML Dossier (Embedded Styling)"]
    H -->|Formatted Excel .xlsx| J["Download SheetJS XLSX Spreadsheet (27 Columns)"]
```

### Export Formats
* **HTML Executive Briefing**: Formatted with Lifewood brand aesthetics, including executive summary KPIs, high-fit radar breakdowns, monthly bar charts, and print-ready CSS pagination.
* **Formatted Excel Spreadsheet (`.xlsx`)**: Structured data tables containing all 27 technical parameters, formatted headers, and column width auto-fits for offline financial modeling.
