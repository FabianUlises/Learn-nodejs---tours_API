// Dependencies
const AppError = require('./../utils/appError');
const jwt = require('jsonwebtoken');
const { promisify } = require('util');
// Model
const User = require('./../models/userModel');
// Function to create jwt
const signToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });
};
// sign up user
exports.signUp = async(req, res) => {
    try {
        // Create upser from input
        const user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            passwordConfirm: req.body.passwordConfirm
        });
        const token = signToken(user._id);
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
// Login user
exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        // Check if email and password exist
        if(!email || !password) {
            return next(new AppError('Please provide email and password', 400));
        }
        // Check if user exists and password is correct
        const user = await User.findOne({ email }).select('+password');
        if(!user || !(await user.correctPassword(password, user.password))) {
            return next(new AppError('Incorrect email or password', 401));
        };
        // If everything is ok, send token to client
        const token = signToken(user._id);
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
// Protect routes
exports.protect = async(req, res, next) => {
    try {
        // Check if token exsits in headers
        let token;
        if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }
        // If no token throw error
        if(!token) {
            return next(new AppError('You are not logged in! Please log in to get access', 401));
        }
        // Verify token
        const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
        next();
    } catch(err) {
        res.status(401).json({
            status: 'fail',
            message: err
        });
    }
};