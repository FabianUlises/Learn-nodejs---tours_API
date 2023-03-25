// Dependencies
const dotenv = require('dotenv').config();
const express = require('express');
// Server configuration
const app = express();

// Routes
app.get('/', (req, res) => {
    res.send('/  get route');
});
// Server on
app.listen(process.env.PORT, (err) => {
    console.log(`server listening on port: ${process.env.PORT}`);
});