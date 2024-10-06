const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();
app.use(cors());
app.use(express.json());
const mongoURI = process.env.MONGO_URI;
const port = 5000;
const authRoutes = require('./Apis/Authentication/index')
mongoose.connect(mongoURI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => {
        console.error('MongoDB connection error:', err);
        process.exit(1);
    });

app.use("/api",authRoutes)


app.use(express.json());
 
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});