import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import { createServer } from 'http';
import { Server } from 'socket.io';
import connectDB from './config/db.js';
import { errorHandler } from './middleware/errorHandler.js';
import { apiLimiter } from './middleware/rateLimiter.js';
import 'colors';

// Connect to MongoDB Database
connectDB();

const app = express();
const httpServer = createServer(app);

// Initialize Socket.io instance
const io = new Server(httpServer, {
  cors: {
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    credentials: true,
  },
});

// Security & HTTP Middleware Stack
app.use(helmet());
app.use(
  cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    credentials: true,
  })
);

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());

// Apply rate limiting middleware to API endpoints
app.use('/api', apiLimiter);

// Health check endpoint
app.get('/api/v1/health', (req, res) => {
  res.status(200).json({ status: 'success', message: 'API server is healthy and running' });
});

// Global Error Handler Middleware
app.use(errorHandler);

// Socket.io Connection Handlers
io.on('connection', (socket) => {
  console.log(`Socket Connected: ${socket.id}`.cyan);
  
  socket.on('disconnect', () => {
    console.log(`Socket Disconnected: ${socket.id}`.cyan);
  });
});

const PORT = process.env.PORT || 5000;

httpServer.listen(PORT, () => {
  console.log(
    `Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`.yellow.bold
  );
});

export { io };

