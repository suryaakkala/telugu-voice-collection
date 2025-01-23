
export default function handler(req: { method: string; body: { message: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { response?: string; error?: string; }): void; new(): any; }; }; }) {
  if (req.method === 'POST') {
    const { message } = req.body;

    // Simple chatbot response logic
    const response = `You said: "${message}"`;
    res.status(200).json({ response });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
