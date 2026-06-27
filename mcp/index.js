#!/usr/bin/env node
/**
 * Rhythm Portfolio MCP server.
 *
 * Exposes curated, public-facing portfolio data (sourced from the Notion hub and
 * synced to data/profile.json) as MCP tools so any Claude client — Claude Code,
 * Claude desktop, or claude.ai (via a remote wrapper) — can answer questions
 * about Rhythm without copy-pasting a resume into every chat.
 *
 * Transport: stdio (local). Add to a client via the config in README.md.
 */
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_PATH = process.env.PROFILE_PATH || join(__dirname, "data", "profile.json");

/** Load the profile data fresh each process start. */
function loadProfile() {
  try {
    return JSON.parse(readFileSync(DATA_PATH, "utf8"));
  } catch (err) {
    throw new Error(`Failed to read profile data at ${DATA_PATH}: ${err.message}`);
  }
}

const data = loadProfile();

/** Wrap any JSON-serializable value as an MCP text result. */
function ok(value) {
  const text = typeof value === "string" ? value : JSON.stringify(value, null, 2);
  return { content: [{ type: "text", text }] };
}

function includesCI(haystack, needle) {
  return String(haystack).toLowerCase().includes(String(needle).toLowerCase());
}

const server = new McpServer({
  name: "rhythm-portfolio",
  version: "1.0.0",
});

// ---- Profile / about -------------------------------------------------------
server.tool(
  "get_profile",
  "Get Rhythm Chawla's high-level profile: headline, summary, the through-line that connects his work, key strengths, education, contact links, and a structured skills breakdown. Start here for an overview before drilling into specific projects or experience.",
  {},
  async () => ok({ profile: data.profile, skills: data.skills })
);

// ---- Projects --------------------------------------------------------------
server.tool(
  "list_projects",
  "List Rhythm's projects. Optionally filter by category, by a tech/keyword substring (matched across name, tech, and description), or to only featured projects. Returns newest-first.",
  {
    category: z.string().optional().describe("e.g. 'AI/ML', 'Dev Tools', 'Full Stack', 'Data Engineering', 'Robotics', 'Game Dev', 'Research', 'Hackathon', 'Product'"),
    tech: z.string().optional().describe("Substring matched across name, tech list, and description, e.g. 'pgvector', 'RAG', 'React'"),
    featured: z.boolean().optional().describe("If true, only return featured projects"),
  },
  async ({ category, tech, featured }) => {
    let projects = data.projects;
    if (category) projects = projects.filter((p) => includesCI(p.category, category));
    if (featured) projects = projects.filter((p) => p.featured === true);
    if (tech) {
      projects = projects.filter(
        (p) =>
          includesCI(p.name, tech) ||
          includesCI(p.description, tech) ||
          (p.tech || []).some((t) => includesCI(t, tech))
      );
    }
    return ok({ count: projects.length, projects });
  }
);

// ---- Experience ------------------------------------------------------------
server.tool(
  "list_experience",
  "List Rhythm's work experience (professional internships and freelance), newest-first. Optionally filter by type.",
  {
    type: z.enum(["Professional", "Freelance"]).optional(),
  },
  async ({ type }) => {
    let exp = data.experience;
    if (type) exp = exp.filter((e) => e.type === type);
    return ok({ count: exp.length, experience: exp });
  }
);

// ---- Achievements ----------------------------------------------------------
server.tool(
  "list_achievements",
  "List Rhythm's awards, scholarships, certifications, and research output.",
  {},
  async () => ok({ count: data.achievements.length, achievements: data.achievements })
);

// ---- Reading ---------------------------------------------------------------
server.tool(
  "list_reading",
  "List the books Rhythm has read, each with a one-line takeaway connecting it to how he thinks/works. Useful for 'get to know him' / culture-fit context. Optionally filter by genre.",
  {
    genre: z.string().optional().describe("e.g. 'Leadership', 'Business', 'Fiction', 'Finance', 'Science', 'Self Growth'"),
  },
  async ({ genre }) => {
    let reading = data.reading;
    if (genre) reading = reading.filter((b) => (b.genre || []).some((g) => includesCI(g, genre)));
    return ok({ count: reading.length, reading });
  }
);

// ---- Interview stories -----------------------------------------------------
server.tool(
  "list_interview_stories",
  "List Rhythm's interview / behavioral stories in STAR format (Situation, Task, Action, Result), each linked to a related project where applicable. Optionally filter by type or theme. Use these for behavioral-interview prep or to evidence a competency.",
  {
    type: z.string().optional().describe("e.g. 'Behavioral', 'Leadership', 'Failure / Learning', 'Conflict', 'Technical', 'Ownership'"),
    theme: z.string().optional().describe("e.g. 'Resilience', 'Initiative', 'Teamwork', 'Ambiguity', 'Impact', 'Failure', 'Leadership', 'Communication'"),
  },
  async ({ type, theme }) => {
    let stories = data.interview_stories;
    if (type) stories = stories.filter((s) => includesCI(s.type, type));
    if (theme) stories = stories.filter((s) => (s.theme || []).some((t) => includesCI(t, theme)));
    return ok({ count: stories.length, stories });
  }
);

// ---- Resume ----------------------------------------------------------------
server.tool(
  "get_resume",
  "Get Rhythm's current resume as Markdown — the ground-truth document he sends to employers. Use this when asked to tailor, critique, or compare against his resume specifically (vs. the richer structured data in the other tools).",
  {},
  async () => ok(data.resume_markdown)
);

// ---- Search ----------------------------------------------------------------
server.tool(
  "search",
  "Free-text search across everything (projects, experience, achievements, reading, interview stories). Returns the matching items grouped by type, ranked by how many query terms they hit. Use this when a question spans categories, e.g. 'evaluation and benchmarking work' or 'anything involving embeddings'.",
  {
    query: z.string().describe("Keywords to search for, e.g. 'RAG embeddings', 'leadership failure', 'data pipeline'"),
    limit: z.number().int().positive().optional().describe("Max results per category (default 5)"),
  },
  async ({ query, limit }) => {
    const max = limit ?? 5;
    const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
    const score = (text) => {
      const t = String(text).toLowerCase();
      return terms.reduce((n, term) => (t.includes(term) ? n + 1 : n), 0);
    };
    const rank = (items, toText) =>
      items
        .map((item) => ({ item, s: score(toText(item)) }))
        .filter((x) => x.s > 0)
        .sort((a, b) => b.s - a.s)
        .slice(0, max)
        .map((x) => x.item);

    return ok({
      query,
      projects: rank(data.projects, (p) => `${p.name} ${p.hook} ${p.description} ${(p.tech || []).join(" ")} ${p.category}`),
      experience: rank(data.experience, (e) => `${e.role} ${e.organization} ${(e.highlights || []).join(" ")} ${(e.tech || []).join(" ")}`),
      interview_stories: rank(data.interview_stories, (s) => `${s.title} ${s.type} ${(s.theme || []).join(" ")} ${s.situation} ${s.task} ${s.action} ${s.result}`),
      achievements: rank(data.achievements, (a) => `${a.name} ${a.issuer}`),
      reading: rank(data.reading, (b) => `${b.title} ${b.author} ${(b.genre || []).join(" ")} ${b.takeaway}`),
    });
  }
);

const transport = new StdioServerTransport();
await server.connect(transport);
console.error("rhythm-portfolio MCP server running on stdio");
