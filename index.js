// Dependencies
const dotenv = require('dotenv').config();
const express = require('express');
// Server configuration
const app = express();

// Routes
app.get('/api/v1/tours', (req, res) => {
    res.status(200).send('/  get route');
});
app.post('/', (req, res) => { 
    res.status(200).send('/ post route');
    console.log(req.body);
});
// Server on
app.listen(process.env.PORT, (err) => {
    console.log(`server listening on port: ${process.env.PORT}`);
});