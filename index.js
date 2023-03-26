// Dependencies
const express = require('express');
const morgan = require('morgan');
const AppError = require('./utils/appError');
const cors = require('cors');
const compression = require('compression');
const globalErrorHandler = require('./controllers/errorController');
// App configuration
const app = express();
const dotenv = require('dotenv').config();
// Cors configuration
app.use(cors());
app.options('*', cors());
// Middleware
app.use(express.json());
app.use(morgan('dev'));
app.use(compression());
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