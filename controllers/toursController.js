// Model
const Tour = require('./../models/tourModel');
const devTours = require('./../dev-data/data/tours');
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
// Get single tour
exports.getTour = async(req, res) => {
    try {
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
// Get single tour and update
exports.updateTour = async(req, res) => {
    try {
        const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
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
// Delete single tour
exports.deletetour = async(req, res) => {
    try {
        const tour = await Tour.findByIdAndDelete(req.params.id);
        res.status(200).json({
            status: 'success',
            data: tour
        });
    } catch(err) {
        res.status(400).json({
            status: 'fail',
            messagE: err
        });
    }
};
exports.seedData = async(req, res) => {
    try {
        const tours = await Tour.insertMany(devTours);
        res.status(200).json({
            status: 'success',
            message: 'data inserted'
        })
    } catch(err) {
        res.status(400).json({
            status: 'fail',
            message: err
        })
    }
};