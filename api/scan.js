import 'dotenv/config';
import { parseStringPromise } from 'xml2js';

export default async function handler(req, res) {
  const { website, prompt } = req.query;

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  if (!website) {
    return res.status(400).json({ error: 'Missing website url.' });
  }

  if (!website.startsWith('https://')) {
    return res.status(400).json({ error: 'URL must be secure and start with https://' });
  }

  try {
    const finalPrompt = prompt
      ? `${website} - ${prompt}`
      : `${website} - Visit the website link and explain the content.`;

    const perplexityRes = await fetch('https://api.perplexity.ai/chat/completions', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'content-type': 'application/json',
        'Authorization': `Bearer ${process.env.PERPLEXITY_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'sonar-pro',
        messages: [
          {
            role: 'system',
            content:
              'You are a strict JSON-only responder. You return ONLY valid, parsable JSON. Your task is to process the user’s request and output a JSON object like this: { "key": { ... } } or { "key": "value" }. Respond with ONLY parsable JSON.'
          },
          {
            role: 'user',
            content: finalPrompt
          }
        ]
      }),
    });

    const perplexityData = await perplexityRes.json();
    const aiResponse = perplexityData?.choices?.[0]?.message?.content || '';

    const match = aiResponse.match(/{[\s\S]*}/);
    if (!match) {
      throw new Error('No JSON found in AI response');
    }

    const json = JSON.parse(match[0]);

    return res.status(200).json({ result: json });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
