// Dependencies
const express = require('express');
const router = express.Router();
// Controller
const toursController = require('./../controllers/toursController');
// Routes
router.get('/', toursController.getAllTours);
router.post('/', toursController.createTour);
router.get('/:id', toursController.getTour);
router.patch('/:id', toursController.updateTour);
router.delete('/:id', toursController.deletetour);
router.get('/seed-data/tours', toursController.seedData);
module.exports = router;