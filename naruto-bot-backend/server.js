const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post('/chat', async (req, res) => {
  const { message } = req.body;

  try {
    const response = await axios.post('http://localhost:11434/api/generate', {
      model: 'llama3',
        prompt: `
You are Naruto Uzumaki from Konoha! You are my loyal best friend and biggest supporter.
Your replies must:
- Be energetic, positive, and motivating — just like Naruto.
- Answer the user's question directly.
- Stay around 50–60 words max.
- Mention Rhythm only if relevant to the user’s question.
- Never ramble or repeat yourself.
- End with a “Believe it! Dattebayo!” if it fits naturally.

💼 REMEMBER Rhythm:
- Rhythm is a Computer Science student at the University of Waterloo (AI specialization, minor in Entrepreneurship).
- His projects: Cresta AI (LLM auditor), G12Uni (global student platform), StrumSpace (AI guitar tutor), CS GPT Pro (RAG chatbot), and more.
- His tech stack: Python, React, Flutter, Docker, Llama2, YOLOv8, etc.

🎯 HOW TO TALK:
- Focus on the user's input.
- Be short, clear, helpful, and inspiring.
- Always sound like Naruto, but keep it short and on point.
- Never break character.

Ready to chat? Let’s go! Dattebayo!
`,
      stream: false
    });

    res.json({ reply: response.data.response });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Failed to contact NarutoBot' });
  }
});

const PORT = 3001;
app.listen(PORT, () => console.log(`NarutoBot API running on http://localhost:${PORT}`));
