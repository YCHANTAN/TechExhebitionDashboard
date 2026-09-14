# Lifewood Tech Exhibition Platform
## Executive Reporting Guide & Export Manual

> **Module:** `/reports`  
> **Audience:** Executive Leadership, Business Development Directors, Supervisors, Analytics Leads  
> **Output Capabilities:** Branded Executive HTML (HK Style), Multi-Tab Excel (.xlsx), Raw CSV  

---

## 1. Reporting Engine Overview

The **Executive Report Generator** transforms raw exhibition pipeline records into decision-grade intelligence briefs. It evaluates strategic fit scores, commercial participation tiers, venue logistics, and regional balance to support:

* **Executive Strategy Reviews:** Evaluating global presence and budget allocations for 2026–2027.
* **BD & Sourcing Roadmaps:** Arming regional business development teams with targeted event pipelines.
* **Attendance & Sponsorship Approvals:** Providing quantitative data (attendee counts, booth rates, Lifewood relevance) to justify event participation.
* **Audit & Compliance Reporting:** Maintaining complete provenance, timestamps, and 27-dimension verification records.

---

## 2. Report Types & Use Cases

| Report Type | Target Scope | Strategic Use Case |
|---|---|---|
| **Regional Summary Report** (`regional`) | Filtered by specific geographic theatre (Asia, North America, Europe, Middle East) or Global. | Best for regional BD directors analyzing geographic density and venue logistics within their market territory. |
| **Business Line Summary Report** (`businessLine`) | Grouped across Lifewood’s 6 core service capabilities. | Best for service-line leaders (e.g., Autonomous Driving, AIGC, LLM Data) evaluating client opportunities and theme relevance. |
| **Full Database Export** (`full`) | Entire published exhibition catalog without truncation. | Best for bi-annual strategic audits, enterprise CRM synchronization, and archival backups. |

---

## 3. Configuration Parameters & Filters

When configuring a report on `/reports`, the user can fine-tune four core dimensions:

### 3.1. Report Scope Selection
* **Regional Summary:** Generates an executive brief concentrated on geographic coverage and venue proximity.
* **Business Line Summary:** Categorizes exhibitions by relevance to Lifewood's core data lines.
* **Full Database Export:** Aggregates all published exhibitions across all territories.

### 3.2. Regional Coverage Filter
* **All Regions (Global Summary):** Consolidates worldwide exhibitions into a single global briefing.
* **Asia (APAC):** Focuses on Singapore, Japan, Korea, China, Malaysia, Philippines, etc.
* **North America (NA):** Focuses on USA and Canada tech hubs (Silicon Valley, Las Vegas, Boston, Toronto).
* **Europe:** Focuses on EU / UK conferences (London, Berlin, Paris, Amsterdam, Barcelona).
* **Middle East:** Focuses on UAE, Saudi Arabia, Qatar (GITEX, LEAP, AI summits).

### 3.3. Temporal / Time-Frame Window
* **Full Coverage (2026–2027):** Complete forward pipeline.
* **Calendar Quarters:** `2026 Q1` (Jan–Mar), `2026 Q2` (Apr–Jun), `2026 Q3` (Jul–Sep), `2026 Q4` (Oct–Dec).
* **Half-Year Horizons:** `2026 H1` (Jan–Jun), `2026 H2` (Jul–Dec).
* **Full Calendar Years:** `Full Year 2026`, `Full Year 2027`.
* **📅 Custom Date Range:** Allows exact selection of start and end dates via interactive date pickers.

### 3.4. Language & Localization
* The platform dynamically localizes headers, business lines, metric cards, status badges, and narrative summaries based on the active language toggle:
  * **English (`EN`):** Standard international executive format.
  * **Simplified Chinese (`中文`):** Lifewood Hong Kong & mainland executive briefing format.

---

## 4. Supported Export Formats & Specifications

### 4.1. Lifewood Branded HTML (Executive Hong Kong Style)
* **Design Philosophy:** Clean, editorial design inspired by premier financial and management consulting intelligence briefs.
* **Key Visual Elements:**
  * **Header Banner:** Lifewood Data Technology corporate branding with report metadata, date stamps, and region filters.
  * **Executive Summary Grid:** Real-time counters showing Total Exhibitions, Average Strategic Fit Score, High-Priority Count, and Business Lines Covered.
  * **Structured Intelligence Table:** Complete tabular breakdown including Record ID, Event Name, City & Country, Dates, Fit Score Pill, Priority Indicator, and Official Website CTA.
* **Live In-Browser Preview:** Interactive preview rendered directly in an embedded iframe on the page before downloading or printing.
* **Print & PDF Ready:** Includes CSS print media rules (`@media print`) that format page breaks cleanly for physical printing or saving as PDF (`Ctrl + P` / `Cmd + P`).

### 4.2. Multi-Tab Excel Workbook (`.xlsx`)
* **File Structure:** Downloaded as a formatted `.xlsx` workbook using open-source styling standards.
* **Worksheet Tabs:**
  1. **Executive Summary Tab:** High-level totals, fit score averages, regional distribution, and time-frame boundaries.
  2. **Exhibitions Catalog Tab:** Comprehensive 27-column audit data with auto-width columns, bold header rows, and color-coded priority levels.
* **Compatibility:** Native support for Microsoft Excel, Google Sheets, LibreOffice Calc, and Apple Numbers.

### 4.3. Raw CSV Spreadsheet (`.csv`)
* **Standard Dataset:** Plain-text, UTF-8 encoded comma-separated values file.
* **Fields Included:** Event Number, Event Name, Region, Country, City, Dates, Venue, Address, Website, Business Lines, Fit Score, Priority Level, Attendance Recommendation, and Notes.
* **Primary Use Case:** Automated ingestion into enterprise BI tools (Tableau, PowerBI), CRM pipelines (Salesforce, HubSpot), or internal Python/R data pipelines.

---

## 5. Step-by-Step Generation Walkthrough

```
Step 1: Navigate to /reports
        │
Step 2: Select Report Type (Regional / Business Line / Full Database)
        │
Step 3: Select Target Region (Global or specific geographic theatre)
        │
Step 4: Select Time Range (Quarterly, Semi-Annual, Annual, or Custom Date Picker)
        │
Step 5: Select Export Format (HTML / Excel .xlsx / Raw CSV)
        │
Step 6: Click "Generate & Preview Report"
        ├─ If HTML: Inspect live preview iframe -> Click "Print / Save PDF"
        └─ If XLSX or CSV: Browser automatically triggers file download
```

### Practical Example Scenario:
> **Goal:** Generate a Q3 2026 briefing for the Board of Directors highlighting Asian AI & Autonomous Driving events.
>
> 1. In **Report Type**, select `Regional Summary Report`.
> 2. In **Target Region**, select `Asia`.
> 3. In **Time Range**, select `2026 Q3 (Jul – Sep)`.
> 4. In **Export Format**, select `Lifewood Branded HTML (HK Report Style)`.
> 5. Click **Generate & Preview Report**.
> 6. Review the interactive preview in the lower panel.
> 7. Click **Print / Save as PDF** to generate an executive-ready handout.

---

## 6. Best Practices for Executive Decision Making

1. **Verify Fit Score Thresholds (Fit 3.0+):** Prioritize budget allocation and physical travel approval for events scoring 4.0 or above ("Critical" / "High" priority).
2. **Review Coverage Gap Alerts:** Cross-reference generated reports with the Dashboard's **Coverage Gap Widget** to ensure no strategic territory is neglected.
3. **Verify Google Maps Geocoding:** For attending teams, click through to the individual event pages (`/events/[id]`) to confirm hotel bookings in proximity to the verified convention center address.
4. **Permanent Attendance Archiving:** Following executive sign-off, mark selected events as "Attended" so they permanently log into `/history?tab=ATTENDED` for year-over-year ROI benchmarking.
