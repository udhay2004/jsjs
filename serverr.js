import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';

const app  = express();
const PORT = process.env.PORT || 3000;

app.use(cors({ origin: '*', methods: ['GET', 'POST', 'OPTIONS'], allowedHeaders: ['Content-Type'] }));
app.use(express.json());

// Health check — also wakes the server from Render sleep
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
        'x-api-key':          apiKey,
        'anthropic-version':  '2023-06-01',
        'content-type':       'application/json',
      },
      body: JSON.stringify({
        model:      'claude-sonnet-4-20250514',
        // ── WHY 1200? ──────────────────────────────────────────────────
        // Normal mid-conversation reply: ~60–120 tokens.
        // Closing response = goodbye message (~100 tokens)
        //   + SCORE_JSON block (~150 tokens)
        //   + safety buffer for detailed summaries = ~1200 tokens total.
        // The previous limit of 600 was cutting off SCORE_JSON before
        // it could be fully generated, causing scores to always be 0.
        // The model naturally stops at 60–120 tokens on normal turns, so
        // raising the ceiling costs nothing on ordinary exchanges.
        max_tokens: 1200,
        system:     system || '',
        messages:   messages,
        stream:     true,
      }),
    });

    if (!anthropicRes.ok) {
      const errText = await anthropicRes.text();
      console.error('Anthropic error:', anthropicRes.status, errText);
      return res.status(anthropicRes.status).send(errText);
    }

    res.setHeader('Content-Type',  'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection',    'keep-alive');
    res.setHeader('X-Accel-Buffering', 'no'); // Disable nginx buffering on Render

    anthropicRes.body.on('data',  chunk => res.write(chunk));
    anthropicRes.body.on('end',   ()    => res.end());
    anthropicRes.body.on('error', err   => { console.error('Stream error:', err); res.end(); });

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
