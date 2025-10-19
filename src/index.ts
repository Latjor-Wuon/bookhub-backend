import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './db';
import authRoutes from './routes/auth';
import bookRoutes from './routes/books';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? [
        'https://bookhub-frontend-git-main-latjors-projects.vercel.app',
        'https://bookhub-frontend-six.vercel.app',
        'https://bookhub.vercel.app',
        'https://book-hub.vercel.app'
      ] 
    : ['http://localhost:3000', 'http://localhost:5173'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Health check endpoints
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Health check endpoint for Render
app.get('/healthz', async (req, res) => {
  try {
    // Check if MongoDB is connected
    const mongoose = require('mongoose');
    const isConnected = mongoose.connection.readyState === 1;
    
    if (isConnected) {
      res.json({ status: 'ok' });
    } else {
      res.status(503).json({ status: 'error', message: 'Database not connected' });
    }
  } catch (error) {
    res.status(503).json({ status: 'error', message: 'Health check failed' });
  }
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes);

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Error:', err);
  
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      message: 'Validation Error',
      errors: Object.values(err.errors).map((e: any) => e.message)
    });
  }
  
  if (err.name === 'CastError') {
    return res.status(400).json({
      message: 'Invalid ID format'
    });
  }
  
  res.status(500).json({
    message: 'Internal Server Error',
    ...(process.env.NODE_ENV === 'development' && { error: err.message })
  });
});

// Start server
const startServer = async () => {
  try {
    // Connect to database using cached connection
    await connectDB();
    
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log(`Book Hub API is ready!`);
      console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

startServer().catch(console.error);

export default app;
