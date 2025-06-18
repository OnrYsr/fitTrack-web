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
const testRoutes = require('./test');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const docRoutes = require('./routes/doc');
const mealRoutes = require('./routes/meal');
const goalRoutes = require('./routes/goal');

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
app.use('/api', docsRoutes);
app.use('/api', testRoutes);
app.use('/api', docRoutes);
app.use('/api', mealRoutes);
app.use('/api', waterRoutes);
app.use('/api', goalRoutes);

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
    components: {
      schemas: {
        Doc: {
          type: 'object',
          required: ['id', 'type', 'title', 'content'],
          properties: {
            id: {
              type: 'integer',
              description: 'Döküman ID'
            },
            type: {
              type: 'string',
              description: 'Döküman tipi'
            },
            title: {
              type: 'string',
              description: 'Döküman başlığı'
            },
            content: {
              type: 'string',
              description: 'Döküman içeriği'
            }
          }
        }
      }
    }
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