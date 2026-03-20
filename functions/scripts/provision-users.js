/* eslint-disable no-console */
const fs = require("fs");
const path = require("path");
const admin = require("firebase-admin");

const ALLOWED_ROLES = new Set(["student", "lecturer", "rep"]);

function parseCsvLine(line) {
  // Basic CSV parser supporting quoted fields and escaped quotes.
  const out = [];
  let cur = "";
  let inQuotes = false;
  for (let i = 0; i < line.length; i += 1) {
    const ch = line[i];
    if (ch === '"') {
      if (inQuotes && line[i + 1] === '"') {
        cur += '"';
        i += 1;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (ch === "," && !inQuotes) {
      out.push(cur.trim());
      cur = "";
    } else {
      cur += ch;
    }
  }
  out.push(cur.trim());
  return out;
}

function parseCsv(filePath) {
  const raw = fs.readFileSync(filePath, "utf8");
  const lines = raw
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter((l) => l.length > 0 && !l.startsWith("#"));

  if (lines.length < 2) {
    throw new Error("CSV must include a header row and at least one data row.");
  }

  const headers = parseCsvLine(lines[0]).map((h) => h.toLowerCase());
  const required = ["email", "password", "displayname", "classid", "role"];
  for (const req of required) {
    if (!headers.includes(req)) {
      throw new Error(`Missing required CSV header: ${req}`);
    }
  }

  const rows = [];
  for (let i = 1; i < lines.length; i += 1) {
    const cols = parseCsvLine(lines[i]);
    const row = {};
    headers.forEach((h, idx) => {
      row[h] = (cols[idx] || "").trim();
    });
    rows.push(row);
  }
  return rows;
}

async function getOrCreateUser({ email, password, displayName }) {
  try {
    const existing = await admin.auth().getUserByEmail(email);
    if (displayName && existing.displayName !== displayName) {
      await admin.auth().updateUser(existing.uid, { displayName });
    }
    return { uid: existing.uid, created: false };
  } catch (e) {
    if (e.code !== "auth/user-not-found") throw e;
  }

  const createdUser = await admin.auth().createUser({
    email,
    password,
    displayName,
  });
  return { uid: createdUser.uid, created: true };
}

async function upsertMembership({ classId, uid, role, displayName, email }) {
  const ref = admin.firestore().doc(`classes/${classId}/members/${uid}`);
  await ref.set(
    {
      role,
      displayName,
      email,
      updatedAt: new Date().toISOString(),
    },
    { merge: true }
  );
}

async function main() {
  const csvArg = process.argv[2] || "../users.template.csv";
  const csvPath = path.resolve(process.cwd(), csvArg);

  if (!fs.existsSync(csvPath)) {
    throw new Error(`CSV file not found: ${csvPath}`);
  }

  admin.initializeApp();
  const rows = parseCsv(csvPath);

  let createdUsers = 0;
  let existingUsers = 0;
  let memberships = 0;

  for (const [idx, row] of rows.entries()) {
    const email = row.email?.toLowerCase();
    const password = row.password;
    const displayName = row.displayname;
    const classId = row.classid;
    const role = row.role?.toLowerCase();

    if (!email || !password || !displayName || !classId || !role) {
      throw new Error(`Row ${idx + 2}: missing required fields.`);
    }
    if (!ALLOWED_ROLES.has(role)) {
      throw new Error(`Row ${idx + 2}: invalid role "${role}" (allowed: student, lecturer, rep).`);
    }
    if (password.length < 6) {
      throw new Error(`Row ${idx + 2}: password too short (min 6 chars).`);
    }

    const { uid, created } = await getOrCreateUser({ email, password, displayName });
    if (created) createdUsers += 1;
    else existingUsers += 1;

    await upsertMembership({ classId, uid, role, displayName, email });
    memberships += 1;
    console.log(`[ok] ${email} -> class=${classId} role=${role} uid=${uid}`);
  }

  console.log("\nProvisioning complete.");
  console.log(`Users created: ${createdUsers}`);
  console.log(`Users existing: ${existingUsers}`);
  console.log(`Membership docs upserted: ${memberships}`);
}

main().catch((err) => {
  console.error("\nProvisioning failed:");
  console.error(err.message || err);
  process.exit(1);
});

