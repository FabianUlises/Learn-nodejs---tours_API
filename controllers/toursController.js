// Model
const Tour = require('./../models/tourModel');
// Get all tours
exports.getAllTours = async (req, res) => {
    // Getting tours from db
    const Tours = await Tour.find();
    // Test cl
    console.log(req.requestTime);
    res.status(200).json({
        status: 'success',
        data: Tours
    });
};
// Create tour
exports.createTour = async (req, res) => {
    // Creating tour
    const newTour = await Tour.create(req.body);
    res.status(201).json({
        status: 'success',
        data: newTour
    });
};
exports.getTour = (req, res) => {
    res.status(200).send('/api/v1/tours/id get tour route');
}
exports.updateTour = (req, res) => {
    res.status(200).send('/api/v1/tours/id patch route');
};
exports.deletetour = (req, res) => {
    res.status(204).send('/api/v1/tours/id delete route');
};