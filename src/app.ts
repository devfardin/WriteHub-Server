import express, { Application, Request, Response } from 'express';
import cors from 'cors';

const app: Application = express();
app.use(express.json());
app.use(cors());

app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message:
      'Welcome to WriteHub Server! The API is up and running smoothly. 🚀',
    timestamp: `Started at ${new Date().toLocaleString()}`,
  });
});

// Export your app
export default app;
