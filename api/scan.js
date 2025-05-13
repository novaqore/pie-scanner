import 'dotenv/config';

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
              'You are a website and business analyzer. Respond to the user using all available resources when requested.'
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

    return res.status(200).json({ result: aiResponse });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
