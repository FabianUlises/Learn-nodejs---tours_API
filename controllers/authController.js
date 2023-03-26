// Dependencies
const AppError = require('./../utils/appError');
const jwt = require('jsonwebtoken');
// Model
const User = require('./../models/userModel');
exports.signUp = async(req, res) => {
    try {
        // Create upser from input
        const user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            passwordConfirm: req.body.passwordConfirm
        });
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN
        });
        res.status(201).json({
            status: 'success',
            token,
            data: {
                user: user
            }
        });
    } catch(err) {
        res.status(400).json({
            status: 'fail',
            message: err
        });
    }
};
exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        // Check if email and password exist
        if(!email || !password) {
            return next(AppError('Please provide email and password', 400));
        }
        // Check if user exists and password is correct
        const user = await User.findOne({ email }).select('+password');
        res.status(200).json({
            status: 'success',
            token
        })
    } catch(err) {
        res.status(400).json({
            status: 'fail',
            message: err
        });
    }
};