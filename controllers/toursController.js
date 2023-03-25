const Tour = require('./../models/tourModel');
exports.getAllTours = async (req, res) => {
    const tours = await Tour.find();
    console.log(tours);
    console.log(req.requestTime);
    res.status(200).send('/api/v1/tours / get route');
};
exports.createTour = (req, res) => {
    console.log(req.body);
    res.status(201).send('/api/v1/tours post route');
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