// Dependencies
const dotenv = require('dotenv').config();
const express = require('express');
// Server configuration
const app = express();

// Routes
app.use('/api/v1/tours', require('./routes/tourRoutes'));

// Server on
app.listen(process.env.PORT, (err) => {
    console.log(`server listening on port: ${process.env.PORT}`);
});