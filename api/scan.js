export default function handler(req, res) {
    const { website } = req.query;
  
    if (req.method === 'GET') {
      res.status(200).json({ message: `You sent website: ${website}` });
    } else {
      res.status(405).json({ error: 'Method Not Allowed' });
    }
  }
  