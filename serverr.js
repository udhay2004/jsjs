/**
 * Comply Globally — Cloudflare Worker
 * Proxies requests to Anthropic API, keeping the API key secret.
 * 
 * DEPLOY STEPS:
 * 1. Go to https://workers.cloudflare.com and create a free account
 * 2. Click "Create Worker"
 * 3. Replace the default code with this entire file
 * 4. Click "Settings" → "Variables" → add secret:
 *    Variable name: ANTHROPIC_API_KEY
 *    Value: your sk-ant-... key
 * 5. Click "Save and Deploy"
 * 6. Copy the worker URL (e.g. https://comply-cv.yourname.workers.dev)
 * 7. Paste that URL into call.html where it says WORKER_URL
 */

const MODEL = 'claude-sonnet-4-20250514';
const MAX_TOKENS = 280;

// Your GitHub Pages domain — update this after deploying
const ALLOWED_ORIGIN = 'https://YOUR_GITHUB_USERNAME.github.io';

export default {
  async fetch(request, env) {
    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        }
      });
    }

    if (request.method !== 'POST') {
      return new Response('Method not allowed', { status: 405 });
    }

    let body;
    try {
      body = await request.json();
    } catch {
      return new Response('Invalid JSON', { status: 400 });
    }

    const { system, messages } = body;

    if (!messages || !Array.isArray(messages)) {
      return new Response('Missing messages', { status: 400 });
    }

    // Forward to Anthropic with streaming
    const anthropicRes = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        model: MODEL,
        max_tokens: MAX_TOKENS,
        system: system || '',
        messages: messages,
        stream: true,
      }),
    });

    if (!anthropicRes.ok) {
      const errText = await anthropicRes.text();
      return new Response(errText, {
        status: anthropicRes.status,
        headers: { 'Access-Control-Allow-Origin': '*' }
      });
    }

    // Stream the response back to the browser
    return new Response(anthropicRes.body, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'no-cache',
      },
    });
  }
};