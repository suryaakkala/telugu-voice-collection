import { formidable } from 'formidable';
import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios'; // Import axios for making HTTP requests

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
      const type = Array.isArray(fields.type)
        ? fields.type[0]
        : fields.type || 'text';
      const prompt = Array.isArray(fields.prompt)
        ? fields.prompt[0]
        : fields.prompt || '';

      try {
        // Make a POST request to the backend API
        const apiResponse = await axios.post('http://127.0.0.1:5000/chat', {
          type,
          prompt,
        });

        // Extract response data
        const { type: responseType, responce } = apiResponse.data;

        // Mocked audio URL for demonstration purposes
        const audioUrl = responseType === 'audio' ? '/path-to-audio-file/audio.mp3' : null;

        res.status(200).json({
          type: responseType,
          response: responce,
          audioUrl,
        });
      } catch (apiError) {
        console.error('API call error:', apiError);
        res.status(500).json({ error: 'Error communicating with the backend API' });
      }
    });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
