// Dependencies
const express = require('express');
const router = express.Router();
// Controller
const toursController = require('./../controllers/tourController');
const authController = require('./../controllers/authController');
// Routes
router.route('/top-5-cheap')
    .get(toursController.aliasTopTour, toursController.getAllTours);
router.route('/')
    .get(authController.protect, toursController.getAllTours)
    .post(toursController.createTour)
router.route('/:id')
    .get(toursController.getTour)
    .patch(toursController.updateTour)
    .delete(authController.protect, authController.restrictTo('admin', 'lead-guide'), toursController.deletetour)
router.get('/seed-data/tours', toursController.seedData);
module.exports = router;