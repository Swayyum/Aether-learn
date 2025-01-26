import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import pkg from '@prisma/client';
import authRoutes from './routes/auth.js';
import assessmentRoutes from './routes/assessments.js';
import terminalRoutes from './routes/terminal.js';
import { authenticateToken } from './middleware/auth.js';

const { PrismaClient } = pkg;
dotenv.config();

const app = express();
const prisma = new PrismaClient();

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoutes);
app.use('/api/assessments', authenticateToken, assessmentRoutes);
app.use('/api/terminal', authenticateToken, terminalRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});