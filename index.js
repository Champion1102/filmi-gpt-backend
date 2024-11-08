const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const swaggerUi = require('swagger-ui-express')
const swaggerJSDoc = require('swagger-jsdoc');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const mongoURI = process.env.MONGO_URI;
mongoose.connect(mongoURI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => {
        console.error('MongoDB connection error:', err);
        process.exit(1);
    });

const movieRoutes = require('./Apis/routes/movieRoutes');
const authRoutes = require('./Apis/routes/authRoutes');

app.use('/', movieRoutes); 
app.use('/api', authRoutes); 

const swaggerOptions = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Your API',
        version: '1.0.0',
        description: 'A sample API documentation using Swagger',
      },
    },
    apis: ['./swagger.yaml'], // This should point to your route files
  };
  
  const swaggerDocs = swaggerJSDoc(swaggerOptions); 
  
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
  
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
