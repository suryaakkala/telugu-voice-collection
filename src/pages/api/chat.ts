import formidable, { Fields, Files } from 'formidable';
import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import fs from 'fs';
import FormData from 'form-data';

export const config = {
  api: {
    bodyParser: false, // Disable bodyParser to handle files
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const form = formidable();

    form.parse(req, async (err, fields: Fields, files: Files) => {
      if (err) {
        console.error('Error parsing form:', err);
        res.status(500).json({ error: 'Failed to parse form' });
        return;
      }

      try {
        const type = fields.type?.toString();
        const name = 'user1'; // Hardcoded user for now
        const formData: any = { name, type };

        // Handling text requests
        if (type === 'text' && fields.prompt) {
          formData.query_message = fields.prompt.toString();
        }

        // Handling audio requests
        if (type === 'audio' && files.file) {
          const file = Array.isArray(files.file) ? files.file[0] : files.file;
          if (file) {
            const audioData = fs.readFileSync(file.filepath, { encoding: 'base64' });
            formData.audio = audioData;
          }
        }

        // Send the request to the backend API
        const apiResponse = await axios.post('https://374svx84-5000.inc1.devtunnels.ms/get-response', formData);
        const { status, message, data, audio, explanation } = apiResponse.data;

        // Send the response back to the client
        res.status(200).json({
          status,
          message,
          data,
          audio,
          explanation,
        });
      } catch (error) {
        console.error('Error communicating with backend:', error);
        res.status(500).json({ error: 'Error communicating with backend API' });
      }
    });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
