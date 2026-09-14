const path = require("path");
const fs = require("fs");
const xlsx = require("xlsx");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const MONTHS = {
  jan: 0, january: 0,
  feb: 1, february: 1,
  mar: 2, march: 2,
  apr: 3, april: 3,
  may: 4,
  jun: 5, june: 5,
  jul: 6, july: 6,
  aug: 7, august: 7,
  sep: 8, sept: 8, september: 8,
  oct: 9, october: 9,
  nov: 10, november: 10,
  dec: 11, december: 11
};

function parseBusinessLines(raw) {
  if (!raw) return JSON.stringify(["Global AI Data"]);
  const lines = String(raw)
    .split(/\r?\n/)
    .map(s => s.trim().replace(/^\d+\.\s*/, "").trim())
    .filter(Boolean);
  return JSON.stringify(lines.length > 0 ? lines : ["Global AI Data"]);
}

function parseSourceLinks(raw, website) {
  const links = [];
  if (website && typeof website === "string" && website.startsWith("http")) {
    links.push(website.trim());
  }
  if (raw && typeof raw === "string") {
    const lines = raw.split(/\r?\n/).map(s => s.trim()).filter(Boolean);
    for (const l of lines) {
      if (!links.includes(l)) links.push(l);
    }
  }
  return JSON.stringify(links.length > 0 ? links : ["Tech Exhibitions 2026.xlsx"]);
}

function parseDateRange(dateStr) {
  if (!dateStr || typeof dateStr !== "string") return { startDate: null, endDate: null };
  const raw = dateStr.trim();

  // Pattern: "(2026 ed.: Mar 16–19)" or "(2026 ed.: Jun 15–18)"
  const edMatch = raw.match(/\(2026\s+ed\.:\s*([A-Za-z]+)\s+(\d{1,2})[–\-–](\d{1,2})\)/i);
  if (edMatch) {
    const m = MONTHS[edMatch[1].toLowerCase()];
    if (m !== undefined) {
      return {
        startDate: new Date(Date.UTC(2026, m, parseInt(edMatch[2], 10))),
        endDate: new Date(Date.UTC(2026, m, parseInt(edMatch[3], 10)))
      };
    }
  }

  // Cross-month e.g. "Sept 28–Oct 1, 2026" or "Jan 22–Feb 1, 2026"
  const crossMonth = raw.match(/([A-Za-z]+)\s+(\d{1,2})[–\-–]([A-Za-z]+)\s+(\d{1,2}),?\s+(\d{4})/i);
  if (crossMonth) {
    const m1 = MONTHS[crossMonth[1].toLowerCase()];
    const m2 = MONTHS[crossMonth[3].toLowerCase()];
    const y = parseInt(crossMonth[5], 10);
    if (m1 !== undefined && m2 !== undefined) {
      return {
        startDate: new Date(Date.UTC(y, m1, parseInt(crossMonth[2], 10))),
        endDate: new Date(Date.UTC(y, m2, parseInt(crossMonth[4], 10)))
      };
    }
  }

  // Same month range e.g. "Feb 10–12, 2026", "June 3–4, 2026"
  const sameMonth = raw.match(/([A-Za-z]+)\s+(\d{1,2})[–\-–](\d{1,2}),?\s+(\d{4})/i);
  if (sameMonth) {
    const m = MONTHS[sameMonth[1].toLowerCase()];
    const y = parseInt(sameMonth[4], 10);
    if (m !== undefined) {
      return {
        startDate: new Date(Date.UTC(y, m, parseInt(sameMonth[2], 10))),
        endDate: new Date(Date.UTC(y, m, parseInt(sameMonth[3], 10)))
      };
    }
  }

  // Single day e.g. "May 14, 2026"
  const singleDay = raw.match(/([A-Za-z]+)\s+(\d{1,2}),?\s+(\d{4})/i);
  if (singleDay) {
    const m = MONTHS[singleDay[1].toLowerCase()];
    const y = parseInt(singleDay[3], 10);
    if (m !== undefined) {
      return {
        startDate: new Date(Date.UTC(y, m, parseInt(singleDay[2], 10))),
        endDate: new Date(Date.UTC(y, m, parseInt(singleDay[2], 10)))
      };
    }
  }

  // Month + Year e.g. "October 2026", "Feb 2026"
  const monthYear = raw.match(/([A-Za-z]+)\s+(\d{4})/i);
  if (monthYear) {
    const m = MONTHS[monthYear[1].toLowerCase()];
    const y = parseInt(monthYear[2], 10);
    if (m !== undefined) {
      const lastDay = new Date(Date.UTC(y, m + 1, 0)).getDate();
      return {
        startDate: new Date(Date.UTC(y, m, 1)),
        endDate: new Date(Date.UTC(y, m, lastDay))
      };
    }
  }

  // TBA with mentioned month e.g. "2026 (June – dates TBA)", "2026 (dates TBA; historically May)"
  const tbaMonth = raw.match(/2026.*?\b(Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:t(?:ember)?)?|Oct(?:ober)?|Nov(?:ember)?|Dec(?:ember)?)\b/i);
  if (tbaMonth) {
    const m = MONTHS[tbaMonth[1].toLowerCase()];
    if (m !== undefined) {
      const lastDay = new Date(Date.UTC(2026, m + 1, 0)).getDate();
      return {
        startDate: new Date(Date.UTC(2026, m, 1)),
        endDate: new Date(Date.UTC(2026, m, lastDay))
      };
    }
  }

  // Season approximations
  if (/spring/i.test(raw)) return { startDate: new Date(Date.UTC(2026, 2, 1)), endDate: new Date(Date.UTC(2026, 4, 31)) };
  if (/summer/i.test(raw)) return { startDate: new Date(Date.UTC(2026, 5, 1)), endDate: new Date(Date.UTC(2026, 7, 31)) };
  if (/autumn|fall/i.test(raw)) return { startDate: new Date(Date.UTC(2026, 8, 1)), endDate: new Date(Date.UTC(2026, 10, 30)) };
  if (/Q2/i.test(raw)) return { startDate: new Date(Date.UTC(2026, 3, 1)), endDate: new Date(Date.UTC(2026, 5, 30)) };

  return { startDate: null, endDate: null };
}

async function migrateExcelData() {
  const filePath = path.resolve(__dirname, "..", "Tech Exhibitions 2026.xlsx");
  if (!fs.existsSync(filePath)) {
    console.warn(`[Migrate] 'Tech Exhibitions 2026.xlsx' not found at ${filePath}. Database already contains migrated entries.`);
    return;
  }

  console.log(`[Migrate] Reading Excel file: ${filePath}`);
  const workbook = xlsx.readFile(filePath);
  const sheet = workbook.Sheets["Tech Exhibit 2026"];
  if (!sheet) {
    console.error("[Error] Sheet 'Tech Exhibit 2026' not found in workbook!");
    process.exit(1);
  }

  const rows = xlsx.utils.sheet_to_json(sheet, { header: 1 });
  console.log(`[Migrate] Loaded ${rows.length} rows (including header) from 'Tech Exhibit 2026'`);

  // Find admin user to attribute creation
  const adminUser = await prisma.user.findFirst({
    where: { email: "admin@lifewood.com" }
  });
  const createdById = adminUser ? adminUser.id : null;

  let insertedCount = 0;
  let updatedCount = 0;

  for (let i = 1; i < rows.length; i++) {
    const row = rows[i];
    if (!row || row.length === 0 || !row[0]) continue;

    const eventNumber = parseInt(row[0], 10);
    if (isNaN(eventNumber)) continue;

    const { startDate, endDate } = parseDateRange(row[5]);

    const eventData = {
      eventNumber,
      region: String(row[1] || "Global").trim(),
      country: String(row[2] || "Global").trim(),
      city: String(row[3] || "Various").trim(),
      eventName: String(row[4] || `Event ${eventNumber}`).trim(),
      dates: String(row[5] || "2026 (dates TBA)").trim(),
      startDate,
      endDate,
      venue: String(row[6] || "Not publicly disclosed").trim(),
      locationAddress: String(row[7] || "Not publicly disclosed").trim(),
      officialWebsite: String(row[8] || "Not publicly disclosed").trim(),
      organizer: String(row[9] || "Not publicly disclosed").trim(),
      eventCategory: String(row[10] || "Technology Exhibition").trim(),
      businessLines: parseBusinessLines(row[11]),
      strategicFocus: String(row[12] || "General Tech & AI").trim(),
      relevanceToLifewood: String(row[13] || "General Relevance").trim(),
      targetAudience: String(row[14] || "Tech professionals").trim(),
      estimatedAttendees: String(row[15] || "Not publicly disclosed").trim(),
      exhibitorOpportunity: String(row[16] || "Not publicly disclosed").trim(),
      boothCost: String(row[17] || "Not publicly disclosed").trim(),
      registrationDeadline: String(row[18] || "Not publicly disclosed").trim(),
      contactEmail: String(row[19] || "Not publicly disclosed").trim(),
      contactPerson: String(row[20] || "Not publicly disclosed").trim(),
      socialMedia: String(row[21] || "Not publicly disclosed").trim(),
      participationRec: String(row[22] || "Monitor only").trim(),
      priorityLevel: String(row[23] || "Medium").trim(),
      fitScore: Math.max(1, Math.min(5, parseInt(row[24], 10) || 3)),
      keyNotes: String(row[25] || "Imported from Tech Exhibitions 2026.xlsx").trim(),
      sourceLinks: parseSourceLinks(row[26], row[8]),
      status: "PUBLISHED",
      source: "IMPORTED",
      createdById
    };

    const existing = await prisma.event.findUnique({
      where: { eventNumber }
    });

    if (existing) {
      await prisma.event.update({
        where: { eventNumber },
        data: {
          ...eventData,
          // Preserve attendance if already marked by user
          isAttended: existing.isAttended,
          attendedAt: existing.attendedAt
        }
      });
      updatedCount++;
    } else {
      await prisma.event.create({
        data: eventData
      });
      insertedCount++;
    }

    if ((i % 50 === 0) || i === rows.length - 1) {
      console.log(`[Progress] Processed ${i}/${rows.length - 1} records...`);
    }
  }

  const totalInDb = await prisma.event.count();
  console.log(`\n========================================`);
  console.log(`[Success] Migration Complete!`);
  console.log(`  Newly Inserted: ${insertedCount}`);
  console.log(`  Updated:        ${updatedCount}`);
  console.log(`  Total in DB:    ${totalInDb} exhibitions`);
  console.log(`========================================\n`);

  await prisma.$disconnect();
  return { totalInDb, insertedCount, updatedCount };
}

if (require.main === module) {
  migrateExcelData().catch(async (e) => {
    console.error("[Migration Failed]:", e);
    await prisma.$disconnect();
    process.exit(1);
  });
}

module.exports = { migrateExcelData };
