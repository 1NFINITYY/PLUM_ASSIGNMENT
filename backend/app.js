// backend/app.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import aiRoutes from './routes/aiRoutes.js';
import { notFound, errorHandler } from './middleware/errorHandler.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Simple health check
app.get('/', (req, res) => {
  res.send('Benefits AI backend is running');
});

// AI routes
app.use('/api', aiRoutes);

// 404 + error handler
app.use(notFound);
app.use(errorHandler);

export default app;
