# Rhythm Portfolio MCP

A local [MCP](https://modelcontextprotocol.io) server that exposes Rhythm Chawla's
curated, public-facing portfolio data to any Claude client — so a chat just *knows*
about his work instead of needing a resume pasted in every time.

## Data flow

```
Notion hub ("Portfolio — Public MCP Data")   ← authoring source of truth
        │  npm run sync   (scripts/sync-from-notion.mjs)
        ▼
data/profile.json                             ← flat, fast, version-controlled
        │  served by
        ▼
index.js (MCP server, stdio)  →  Claude Code / Claude desktop / (remote later)
```

`profile.json` is committed, so the server works **offline with zero setup**. Running
the sync is only needed when you edit the Notion hub.

## Tools

| Tool | What it returns |
|------|-----------------|
| `get_profile` | Headline, summary, through-line, strengths, education, links, skills |
| `list_projects` | Projects; filter by `category`, `tech` substring, or `featured` |
| `list_experience` | Work history; filter by `type` (Professional/Freelance) |
| `list_achievements` | Awards, scholarships, certs, research |
| `list_reading` | Books + takeaways; filter by `genre` |
| `list_interview_stories` | STAR stories; filter by `type`/`theme`; linked to projects |
| `get_resume` | Current resume as Markdown (ground-truth document) |
| `search` | Free-text search across everything, ranked, grouped by type |

## Install

```bash
cd mcp
npm install
```

## Use it in Claude Code

From the repo root:

```bash
claude mcp add rhythm-portfolio -- node ./mcp/index.js
```

Or commit a project-scoped `.mcp.json` at the repo root:

```json
{
  "mcpServers": {
    "rhythm-portfolio": {
      "command": "node",
      "args": ["./mcp/index.js"]
    }
  }
}
```

Then ask Claude things like *"Use rhythm-portfolio: which of my projects involve embeddings?"*
or *"Pull a failure story and a technical story for an interview."*

## Use it in Claude desktop

Add to `claude_desktop_config.json` (use an absolute path):

```json
{
  "mcpServers": {
    "rhythm-portfolio": {
      "command": "node",
      "args": ["/Users/rhychaw/projects/3d-porto/mcp/index.js"]
    }
  }
}
```

## Re-sync from Notion

```bash
# 1. Create an internal integration: https://www.notion.so/my-integrations
# 2. Share the hub page + its databases with the integration
export NOTION_TOKEN=secret_xxx
npm run sync
```

Hand-curated fields (`profile`, `skills`, `resume_markdown`) are preserved; only the
database-backed arrays are rebuilt.

## Later: claude.ai (web)

stdio is local-only. To reach claude.ai, wrap this in an HTTP/SSE transport, host it
(e.g. a small Node service or serverless function), add auth, and register it as a
remote MCP. The tool definitions in `index.js` stay the same — only the transport and
hosting change.
