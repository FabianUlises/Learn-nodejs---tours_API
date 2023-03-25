const express = require('express');
const router = express.Router();
router.get('/', (req, res) => {
    res.send('get users stub route');
});
router.post('/', (req, res) => {
    res.send('users post stub route');
});
router.get('/:id', (req, res) => {
    res.send('get user stub route');
});
router.patch('/:id', (req, res) => {
    res.send('update user stub route');
});
router.delete('/:id', (req, res) => {
    res.send('delete user stub route');
});
module.exports = router;