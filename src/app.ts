import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app: Application = express();

app.use(cors());
app.use(express.json());

app.get('/api/health', (req: Request, res: Response) => {
  res.status(200).json({
    status: 'OK',
    message: 'Booking System API is running',
    timestamp: new Date().toISOString(),
  });
});

app.use((req: Request, res: Response) => {
  res.status(404).json({
    status: 'ERROR',
    message: 'Route not found',
    path: req.path,
  });
});

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  console.error('Error:', error);
  
  res.status(error.status || 500).json({
    status: 'ERROR',
    message: error.message || 'Internal Server Error',
    error: process.env.NODE_ENV === 'development' ? error : {},
  });
});

export default app;