const express = require('express');
const mongoose = require('mongoose');
const redisClient = require('./utils/redisClient.utils');

const { connectDB } = require('./config/db.config');
const app = express();

// Middleware
app.use(express.json());

// Database connection
connectDB();

// Caching connection (Redis)
redisClient.connect().then(() => {
    console.log('Redis connected');
}).catch(err => console.error('Redis connection error', err));



// Server setup
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
