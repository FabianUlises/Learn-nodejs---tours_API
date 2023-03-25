const express = require('express');
const router = express.Router();
router.get('/', (req, res) => {
    res.status(200).send('/api/v1/tours / get route');
});
router.post('/', (req, res) => {
    console.log(req.body);
    res.status(201).send('/api/v1/tours post route');
});
router.patch('/', (req, res) => {
    res.status(200).send('/api/v1/tours patch route');
});
router.delete('/', (req, res) => {
    res.status(204).send('/api/v1/tours delete route');
});
module.exports = router;