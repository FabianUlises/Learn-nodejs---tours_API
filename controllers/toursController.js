// Model
const Tour = require('./../models/tourModel');
// Get all tours
exports.getAllTours = async (req, res) => {
    try {
        // Getting tours from db
        const tours = await Tour.find();
        // Test cl
        console.log(req.requestTime);
        res.status(200).json({
            status: 'success',
            data: tours
        });
    } catch(err) {
        res.status(400).json({
            status: 'fail',
            message: err
        });
    }
};
// Create tour
exports.createTour = async (req, res) => {
    try {
        // Creating tour
        const newTour = await Tour.create(req.body);
        res.status(201).json({
            status: 'success',
            data: newTour
        });   
    } catch(err) {
        res.status(400).json({
            status: 'fail',
            message: 'Invalid data sent!'
        });
    }

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