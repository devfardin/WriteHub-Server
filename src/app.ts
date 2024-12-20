import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import router from './routes';
import notFound from './app/middlewares/notFound';
import globalErrorHandle from './app/middlewares/globalErrorHandler';
const app: Application = express();
app.use(express.json());
app.use(cors());

app.use('/api', router);

app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message:
      'Welcome to WriteHub Server! The API is up and running smoothly. 🚀',
    timestamp: `Started at ${new Date().toLocaleString()}`,
  });
});
// Not found api error handle
app.use(notFound);
// Global Error handle
app.use(globalErrorHandle);

// Export your app
export default app;
