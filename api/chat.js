// Vercel serverless function: the portfolio chatbot's brain.
// Holds the Anthropic API key server-side and answers questions grounded ONLY in
// Rhythm's profile. The browser never sees the key.
//
// Setup: in Vercel project settings add env var ANTHROPIC_API_KEY (from
// console.anthropic.com). Optionally ANTHROPIC_MODEL to override the model.
import Anthropic from '@anthropic-ai/sdk';
import { PROFILE_CONTEXT } from './profileContext.js';

const MODEL = process.env.ANTHROPIC_MODEL || 'claude-opus-4-8';

const SYSTEM = `You are Rhythm Chawla's AI assistant, embedded in his portfolio website. You answer visitors' questions about Rhythm — recruiters, collaborators, and the curious.

Rules:
- Use ONLY the facts in the PROFILE below. If something isn't there, say you don't have that detail rather than inventing it.
- Be warm, concise, and specific — this is a chat widget, so keep answers to a few sentences unless asked for depth. Lead with the answer.
- Speak about Rhythm in a natural mix of third person and his voice; it's fine to say "Rhythm built…" or "I built…". Never claim to be Rhythm himself.
- Be honest about gaps or trade-offs; don't oversell. If asked whether he fits a role, give a grounded, balanced take.
- Output only your final answer — no meta-commentary about your reasoning.

PROFILE:
${PROFILE_CONTEXT}`;

// Coerce arbitrary history into a clean, alternating user/assistant list that
// starts with a user turn (Anthropic requires this).
function sanitizeHistory(history) {
  if (!Array.isArray(history)) return [];
  const cleaned = [];
  for (const m of history) {
    const role = m && (m.role === 'assistant' || m.role === 'user') ? m.role : null;
    const content = m && typeof m.content === 'string' ? m.content.trim() : '';
    if (!role || !content) continue;
    if (cleaned.length === 0 && role !== 'user') continue; // must start with user
    if (cleaned.length && cleaned[cleaned.length - 1].role === role) {
      cleaned[cleaned.length - 1].content += `\n${content}`; // merge same-role
    } else {
      cleaned.push({ role, content });
    }
  }
  return cleaned.slice(-10); // last few turns is plenty of context
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }
  if (!process.env.ANTHROPIC_API_KEY) {
    res.status(503).json({ error: 'Chat is not configured (no API key).' });
    return;
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : req.body || {};
    const message = typeof body.message === 'string' ? body.message.trim() : '';
    if (!message) {
      res.status(400).json({ error: 'Missing message.' });
      return;
    }

    const history = sanitizeHistory(body.history);
    const messages = [...history, { role: 'user', content: message }];

    const client = new Anthropic(); // reads ANTHROPIC_API_KEY from env
    const response = await client.messages.create({
      model: MODEL,
      max_tokens: 1024,
      system: SYSTEM,
      messages,
    });

    const reply = response.content
      .filter((b) => b.type === 'text')
      .map((b) => b.text)
      .join('')
      .trim();

    res.status(200).json({ reply });
  } catch (err) {
    const status = err && err.status ? err.status : 500;
    console.error('[chat] error:', err && err.message ? err.message : err);
    res.status(status).json({ error: 'Chat failed. Please try again.' });
  }
}
