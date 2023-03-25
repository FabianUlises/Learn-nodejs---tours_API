// Dependencies
const express = require('express');
const morgan = require('morgan');
// Server configuration
const app = express();
const dotenv = require('dotenv').config();
// Middleware
app.use(express.json());
app.use(morgan('dev'));
// Get requested time and date
app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
});
// Routes
app.use('/api/v1/tours', require('./routes/tourRoutes'));
app.use('/api/v1/users', require('./routes/userRoutes'));
module.exports = app;