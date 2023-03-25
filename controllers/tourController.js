// Model
const Tour = require('../models/tourModel');
const devTours = require('../dev-data/data/tours');
class APIFeatures {
    constructor(query, queryString) {
        this.query = query;
        this.queryString = queryString;
    }
    filter() {
        // Filtering
        // Query
        const queryObj = { ...this.queryString };
        // Removing unwanted query items from query string
        const excludedFields = ['page', 'sort', 'limit', 'fields'];
        excludedFields.forEach((el) => delete queryObj[el]);
        // Advanced filtering
        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gte|gt|lte)\b/g, match => `$${match}`);
        this.query = this.query.find(JSON.parse(queryStr));
        return this;
    }
    sort() {
        // Sorting
        if(this.queryString.sort) {
            const sortBy = this.queryString.sort.split(',').join(' ');
            // Sorting query
            this.query = this.query.sort(sortBy);
        } else {
            this.query = this.query.sort('price');
        }
        return this;
    }
    limitFields() {
        // Limiting
        if(this.queryString.fields) {
            const fields = this.queryString.fields.split(',').join(' ');
            this.query = this.query.select(fields);
        } else {
            this.query = this.query.select('-__v');
        }
        return this;
    }
};
// Get all tours
exports.getAllTours = async (req, res) => {
    try {
        const features = new APIFeatures(Tour.find(), req.query)
            .filter()
            .sort()
            .limitFields()
        const tours = await features.query;
        res.status(200).json({
            status: 'success',
            data: tours
        });
    } catch(err) {
        res.status(400).json({
            status: 'fail',
            message: 'err'
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
// Alias middleware controller
exports.aliasTopTour = (req, res, next) => {
    req.query.limit = '5';
    req.query.sort = 'price,-ratingAverage';
    req.query.fields = 'name,price,ratingAverage,summary';
    next();
};