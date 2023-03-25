// Dependencies
const dotenv = require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
// Server configuration
const app = express();
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
// Server on
app.listen(process.env.PORT, (err) => {
    console.log(`server listening on port: ${process.env.PORT}`);
});