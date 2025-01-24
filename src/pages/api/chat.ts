import { formidable } from 'formidable';
import { NextApiRequest, NextApiResponse } from 'next';

export const config = {
  api: {
    bodyParser: false, // Disable built-in body parser to handle files
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const form = formidable();

    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.error('Form parsing error:', err);
        res.status(500).json({ error: 'File upload error' });
        return;
      }

      // Extract the message from fields
      const message = Array.isArray(fields.message)
        ? fields.message[0]
        : fields.message || '';

      // Mocked response data
      const responseText = `You said: "${message}"`;
      const teluguTranscript = `తెలుగు అనువాదం: "${message}"`; // Example Telugu translation
      const audioUrl = '/path-to-audio-file/audio.mp3'; // Example audio URL (replace with actual logic)

      res.status(200).json({
        response: responseText,
        audioUrl,
        teluguTranscript,
      });
    });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
