#!/usr/bin/env node
/**
 * Sync the curated Notion hub → data/profile.json.
 *
 * Notion is the authoring source of truth; this regenerates the flat JSON the
 * MCP server (and, later, the portfolio site) reads. Hand-curated fields that
 * don't live in a database — `profile`, `skills`, `resume_markdown` — are
 * PRESERVED from the existing profile.json; only the database-backed arrays
 * (projects, experience, achievements, reading, interview_stories) are rebuilt.
 *
 * Setup:
 *   1. Create a Notion *internal integration* → https://www.notion.so/my-integrations
 *   2. Share the "Portfolio — Public MCP Data" page (and its databases) with it.
 *   3. export NOTION_TOKEN=secret_xxx
 *   4. npm run sync
 *
 * Note: this uses a Notion internal integration token, which is different from
 * the claude.ai Notion connector used to build the hub originally.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_PATH = join(__dirname, "..", "data", "profile.json");

// Database (not data-source/collection) IDs for the hub's databases.
const DB = {
  projects: "12f136616b5747509391c161533820b4",
  experience: "a0c12abecb8544b6a409849e0bd925c5",
  achievements: "a9631173a2db4fe9953e00a097f1364d",
  reading: "ed918fcef2dc4136a2066baf089e620b",
  interviewStories: "92839ee33a414b37b61b96bb609a100b",
};

const token = process.env.NOTION_TOKEN;
if (!token) {
  console.error("Missing NOTION_TOKEN. See setup instructions at the top of this file.");
  process.exit(1);
}

let Client;
try {
  ({ Client } = await import("@notionhq/client"));
} catch {
  console.error("@notionhq/client is not installed. Run: npm install @notionhq/client");
  process.exit(1);
}
const notion = new Client({ auth: token });

// ---- Property extractors ---------------------------------------------------
const txt = (p) => (p?.rich_text || p?.title || []).map((t) => t.plain_text).join("").trim();
const sel = (p) => p?.select?.name ?? null;
const multi = (p) => (p?.multi_select || []).map((o) => o.name);
const check = (p) => p?.checkbox === true;
const url = (p) => p?.url ?? null;
const list = (s) => (s ? s.split(",").map((x) => x.trim()).filter(Boolean) : []);
const bullets = (s) =>
  (s ? s.split(/\n+/) : [])
    .map((l) => l.replace(/^[-*]\s*/, "").trim())
    .filter(Boolean);

async function queryAll(databaseId) {
  const rows = [];
  let cursor;
  do {
    const res = await notion.databases.query({ database_id: databaseId, start_cursor: cursor });
    rows.push(...res.results);
    cursor = res.has_more ? res.next_cursor : undefined;
  } while (cursor);
  return rows;
}

console.error("Syncing from Notion…");

// Projects (build id → name map for relation resolution)
const projectRows = await queryAll(DB.projects);
const projectNameById = new Map();
const projects = projectRows.map((r) => {
  const P = r.properties;
  const name = txt(P.Name);
  projectNameById.set(r.id, name);
  return {
    name,
    hook: txt(P.Hook),
    description: txt(P.Description),
    category: sel(P.Category),
    tech: list(txt(P.Tech)),
    date: txt(P.Date),
    ...(check(P.Featured) ? { featured: true } : {}),
    ...(txt(P.Award) ? { award: txt(P.Award) } : {}),
    ...(url(P.Repo) ? { repo: url(P.Repo) } : {}),
    ...(url(P.Live) ? { live: url(P.Live) } : {}),
  };
});

const experience = (await queryAll(DB.experience)).map((r) => {
  const P = r.properties;
  return {
    role: txt(P.Role),
    organization: txt(P.Organization),
    type: sel(P.Type),
    period: txt(P.Period),
    tech: list(txt(P.Tech)),
    highlights: bullets(txt(P.Highlights)),
  };
});

const achievements = (await queryAll(DB.achievements)).map((r) => {
  const P = r.properties;
  return {
    name: txt(P.Name),
    issuer: txt(P.Issuer),
    date: txt(P.Date),
    ...(url(P.Link) ? { link: url(P.Link) } : {}),
  };
});

const reading = (await queryAll(DB.reading)).map((r) => {
  const P = r.properties;
  return {
    title: txt(P.Title),
    author: txt(P.Author),
    genre: multi(P.Genre),
    status: sel(P.Status),
    takeaway: txt(P.Takeaway),
  };
});

const interview_stories = (await queryAll(DB.interviewStories)).map((r) => {
  const P = r.properties;
  const rel = (P["Related Project"]?.relation || []).map((x) => projectNameById.get(x.id) || null).filter(Boolean);
  return {
    title: txt(P.Title),
    type: sel(P.Type),
    theme: multi(P.Theme),
    situation: txt(P.Situation),
    task: txt(P.Task),
    action: txt(P.Action),
    result: txt(P.Result),
    related_project: rel[0] ?? null,
  };
});

// Preserve hand-curated, non-database fields.
const existing = JSON.parse(readFileSync(OUT_PATH, "utf8"));
const out = {
  _meta: { ...existing._meta, lastSynced: new Date().toISOString().slice(0, 10) },
  profile: existing.profile,
  skills: existing.skills,
  experience,
  projects,
  achievements,
  reading,
  interview_stories,
  resume_markdown: existing.resume_markdown,
};

writeFileSync(OUT_PATH, JSON.stringify(out, null, 2) + "\n");
console.error(
  `Wrote ${OUT_PATH}: ${projects.length} projects, ${experience.length} experience, ${achievements.length} achievements, ${reading.length} books, ${interview_stories.length} stories.`
);
