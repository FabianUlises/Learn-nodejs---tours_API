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
exports.getTour = async(req, res) => {
    try {
        // Get single tour
        const tour = await Tour.findById(req.params.id);
        res.status(200).json({
            status: 'success',
            data: tour
        });
    } catch(err) {
        res.status(404).json({
            status: 'fail',
            message: err
        });
    }
}
exports.updateTour = async(req, res) => {
    try {
        // Get single tour and update
        const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
            new: true
        })
        res.status(200).json({
            status: 'success',
            data: tour
        });
    } catch(err) {
        res.status(400).json({
            status: 'fail',
            message: err
        });
    }
};
exports.deletetour = (req, res) => {
    res.status(204).send('/api/v1/tours/id delete route');
};