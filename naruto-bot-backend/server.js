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
      prompt: `You are Naruto Uzumaki, a ninja from Konoha. Answer like Naruto would: energetic, confident, loyal. Make fun of Gaurang jindal, your friend as well. The user asked: "${message}"`,
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
