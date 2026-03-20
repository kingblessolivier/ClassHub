const admin = require("firebase-admin");
const functions = require("firebase-functions");

admin.initializeApp();

function toSystemPrompt({ classId, member, assignments, announcements, studentDisplayName }) {
  const today = new Date().toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const assignLines = assignments
    .map((a) => {
      const due = new Date(a.due);
      const diffDays = Math.round((due.getTime() - Date.now()) / 86400000);
      const dueLabel = diffDays < 0 ? "OVERDUE" : diffDays === 0 ? "TODAY" : `${diffDays} days away`;
      return `- "${a.title}" | Subject: ${a.subject} | Due: ${due.toLocaleDateString("en-GB")} (${dueLabel}) | ${a.marks} marks | Posted by: ${a.postedByName} | Desc: ${a.desc?.substring(0, 120) ?? ""}`;
    })
    .join("\n");

  const annLines = announcements
    .slice(0, 6)
    .map(
      (n) =>
        `- "${n.title}" (${n.type}): ${n.body?.substring(0, 120) ?? ""}`
    )
    .join("\n");

  return `You are ClassHub AI, a helpful assistant for a university class portal.
Today is ${today}.

User: ${studentDisplayName} (${member.role})
Class ID: ${classId}

Current assignments:
${assignLines || "(none)"}

Announcements:
${annLines || "(none)"}

Be concise, helpful, and friendly. Format responses clearly.
If asked about deadlines, be specific about dates.
Help students plan and prioritize.`;
}

async function callAnthropic({ apiKey, model, systemPrompt, messages }) {
  // Anthropic Messages API
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model,
      max_tokens: 900,
      system: systemPrompt,
      messages,
    }),
  });

  const data = await res.json();
  const reply = data?.content?.[0]?.text;
  if (!reply) {
    throw new Error(`Anthropic returned no content. Response: ${JSON.stringify(data).slice(0, 5000)}`);
  }
  return reply;
}

exports.classhubAi = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError("unauthenticated", "You must be signed in.");
  }

  const classId = data?.classId;
  const message = (data?.message || "").trim();
  if (!classId || !message) {
    throw new functions.https.HttpsError("invalid-argument", "Missing classId or message.");
  }

  const history = Array.isArray(data?.history) ? data.history : [];

  const memberRef = admin.firestore().doc(`classes/${classId}/members/${context.auth.uid}`);
  const memberSnap = await memberRef.get();
  if (!memberSnap.exists) {
    throw new functions.https.HttpsError("permission-denied", "You are not enrolled in this class.");
  }

  const member = memberSnap.data();
  const memberRole = member?.role;
  const memberDisplayName = member?.displayName || context.auth.token?.email || context.auth.uid;

  // Role is used mainly to tailor suggestions; permissions are enforced by Firestore/storage rules.
  const [assignSnap, annSnap] = await Promise.all([
    admin
      .firestore()
      .collection(`classes/${classId}/assignments`)
      .orderBy("due", "asc")
      .limit(20)
      .get(),
    admin
      .firestore()
      .collection(`classes/${classId}/announcements`)
      .orderBy("postedAt", "desc")
      .limit(20)
      .get(),
  ]);

  const assignments = assignSnap.docs.map((d) => ({ id: d.id, ...d.data() }));
  const announcements = annSnap.docs.map((d) => ({ id: d.id, ...d.data() }));

  // Make sure assignment prompt has student-friendly labels.
  const normalizedAssignments = assignments.map((a) => ({
    ...a,
    postedByName: a.postedByName || a.postedBy || "Class Staff",
  }));

  const systemPrompt = toSystemPrompt({
    classId,
    member: { role: memberRole },
    assignments: normalizedAssignments,
    announcements,
    studentDisplayName: memberDisplayName,
  });

  const runtimeConfig = typeof functions.config === "function" ? functions.config() : {};
  const apiKey =
    process.env.ANTHROPIC_API_KEY ||
    runtimeConfig?.anthropic?.apikey ||
    runtimeConfig?.anthropic?.api_key;
  if (!apiKey) {
    throw new functions.https.HttpsError(
      "failed-precondition",
      "Missing Anthropic API key. Set ANTHROPIC_API_KEY in your Firebase Functions environment."
    );
  }

  const model =
    process.env.ANTHROPIC_MODEL ||
    runtimeConfig?.anthropic?.model ||
    "claude-sonnet-4-20250514";

  const anthropicMessages = (history.length ? history : [{ role: "user", content: message }])
    .filter((m) => m && typeof m.content === "string" && m.content.trim().length > 0)
    .slice(-14)
    .map((m) => ({
      role: m.role === "assistant" ? "assistant" : "user",
      content: m.content,
    }));

  const reply = await callAnthropic({
    apiKey,
    model,
    systemPrompt,
    messages: anthropicMessages,
  });

  return { reply };
});

