const express = require('express');
const mongoose = require('mongoose');
const apiRoutes = require('./routes/api.routes')
const { connectDB } = require('./config/db.config');

const app = express();

// Middleware
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.use('/api', apiRoutes);

// Server start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
