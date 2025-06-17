require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const loginRoutes = require('./login');
const mealsRoutes = require('./meals');
const waterRoutes = require('./water');
const goalsRoutes = require('./goals');
const aiRoutes = require('./ai');
const docsRoutes = require('./docs');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to FitTrack API' });
});

app.use('/api/auth', authRoutes);
app.use('/api', loginRoutes);
app.use('/api', mealsRoutes);
app.use('/api', waterRoutes);
app.use('/api', goalsRoutes);
app.use('/api/ai', aiRoutes);

console.log('Docs route import ediliyor...');
app.use('/api', docsRoutes);
console.log('Docs route import edildi.');

console.log('Test route import ediliyor...');
const testRoutes = require('./test');
console.log('Test route import edildi.');

console.log('Test route app.use ediliyor...');
app.use('/api', testRoutes);
console.log('Test route app.use edildi.');

console.log('Docs route app.use ediliyor...');
app.use('/api', docsRoutes);
console.log('Docs route app.use edildi.');

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'FitTrack API',
      version: '1.0.0',
      description: 'FitTrack Backend API Dokümantasyonu',
    },
    servers: [
      { url: 'http://localhost:3000' }
    ],
  },
  apis: ['./src/*.js'], // Endpoint açıklamaları için
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Database connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 