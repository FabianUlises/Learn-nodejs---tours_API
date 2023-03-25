const express = require('express');
const router = express.Router();
router.get('/', (req, res) => {
    res.status(200).send('/api/v1/tours / get route');
});
router.post('/', (req, res) => {
    console.log(req.body);
    res.status(201).send('/api/v1/tours post route');
});
module.exports = router;