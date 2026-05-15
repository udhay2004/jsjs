/**
 * Comply Globally — Dr. CV Voice Backend
 * ─────────────────────────────────────────────────────
 * Serves two purposes:
 *   1. POST /session → mints an OpenAI Realtime ephemeral token
 *      and returns it to the browser so WebRTC can connect directly
 *      to OpenAI (browser ↔ OpenAI, audio never touches this server).
 *   2. GET /         → health-check / keep-alive for Render.
 *
 * ENV VARS required on Render:
 *   OPENAI_API_KEY   — your OpenAI secret key (NOT Anthropic)
 *
 * Optional:
 *   PORT             — defaults to 3000
 */

import express from 'express';
import cors    from 'cors';

const app  = express();
const PORT = process.env.PORT || 3000;

/* ── Middleware ── */
app.use(cors({ origin: '*', methods: ['GET', 'POST', 'OPTIONS'], allowedHeaders: ['Content-Type'] }));
app.use(express.json());

/* ── Health check (also wakes Render from sleep) ── */
app.get('/', (_req, res) => {
  res.json({ status: 'Dr. CV proxy running', ts: new Date().toISOString() });
});

/**
 * POST /session
 *
 * Body (optional JSON):
 *   { systemPrompt: string, voice: string }
 *
 * Mints a short-lived OpenAI Realtime ephemeral token via
 * POST https://api.openai.com/v1/realtime/sessions
 * and returns the full response to the browser.
 *
 * The browser then uses `client_secret.value` as the Bearer token
 * for its WebRTC SDP exchange directly with OpenAI.
 *
 * Note: the system prompt / voice / VAD config are set here so the
 * browser never needs to hold the real API key.
 */
app.post('/session', async (req, res) => {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'OPENAI_API_KEY not set on server' });
  }

  const { systemPrompt = '', voice = 'shimmer' } = req.body || {};

  const sessionConfig = {
    model: 'gpt-4o-realtime-preview-2024-12-17',
    voice,

    // System instructions go here — the browser never touches the key
    instructions: systemPrompt || 'You are a helpful assistant.',

    // Server-side VAD with generous pause thresholds so the user can
    // pause mid-sentence without the model cutting in too quickly.
    turn_detection: {
      type:                    'server_vad',
      threshold:               0.45,   // lower = more sensitive (default 0.5)
      prefix_padding_ms:       400,    // audio before speech is captured
      silence_duration_ms:     900,    // wait 900 ms of silence before ending turn
      create_response:         true,   // auto-respond after each turn
      interrupt_response:      true,   // allow user to barge in
    },

    // Request both audio + text so we can capture transcripts
    modalities: ['audio', 'text'],

    // Enable input audio transcription so we get user transcript events
    input_audio_transcription: {
      model: 'whisper-1',
    },
  };

  try {
    const oaiRes = await fetch('https://api.openai.com/v1/realtime/sessions', {
      method:  'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type':  'application/json',
      },
      body: JSON.stringify(sessionConfig),
    });

    if (!oaiRes.ok) {
      const errText = await oaiRes.text();
      console.error('OpenAI session error:', oaiRes.status, errText);
      return res.status(oaiRes.status).json({ error: errText });
    }

    const data = await oaiRes.json();
    // data.client_secret.value is the ephemeral token the browser needs
    return res.json(data);

  } catch (err) {
    console.error('Session proxy error:', err.message);
    return res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Comply Globally Dr.CV proxy → port ${PORT}`);
});
