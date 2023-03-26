// Dependencies
const express = require('express');
const morgan = require('morgan');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
// App configuration
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
app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});
app.use(globalErrorHandler);
module.exports = app;