import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({ origin: '*', methods: ['GET', 'POST', 'OPTIONS'], allowedHeaders: ['Content-Type'] }));
app.use(express.json());

// Health check — also used by the client to wake the server from Render sleep
app.get('/', (req, res) => {
  res.json({ status: 'Dr. CV proxy is running', timestamp: new Date().toISOString() });
});

app.post('/chat', async (req, res) => {
  const { system, messages } = req.body;

  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: { message: 'Missing messages array' } });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: { message: 'API key not configured on server' } });
  }

  try {
    const anthropicRes = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        // ── WHY 600? ──────────────────────────────────────────────────────
        // A normal mid-conversation reply uses ~60-120 tokens.
        // The CLOSING response = goodbye message (~100 tokens) +
        // SCORE_JSON block (~150 tokens) = ~250 tokens minimum.
        // 280 was cutting off the SCORE_JSON before it could be parsed,
        // so scores always came back as 0. 600 gives plenty of headroom
        // for even the most detailed closing without wasting money on
        // normal turns (the model naturally stops at 60-120 tokens anyway).
        max_tokens: 600,
        system: system || '',
        messages: messages,
        stream: true,
      }),
    });

    if (!anthropicRes.ok) {
      const errText = await anthropicRes.text();
      console.error('Anthropic error:', anthropicRes.status, errText);
      return res.status(anthropicRes.status).send(errText);
    }

    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.setHeader('X-Accel-Buffering', 'no'); // Disable nginx buffering on Render

    anthropicRes.body.on('data', chunk => res.write(chunk));
    anthropicRes.body.on('end', () => res.end());
    anthropicRes.body.on('error', err => {
      console.error('Stream error:', err);
      res.end();
    });

  } catch (err) {
    console.error('Proxy error:', err.message);
    if (!res.headersSent) {
      res.status(500).json({ error: { message: err.message } });
    }
  }
});

app.listen(PORT, () => {
  console.log(`Comply CV proxy running on port ${PORT}`);
});
