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
            passwordConfirm: req.body.passwordConfirm,
            passwordChangedAt: req.body.passwordChangedAt,
            role: req.body.role
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
        };
        // If no token throw error
        if(!token) {
            return next(new AppError('You are not logged in! Please log in to get access', 401));
        };
        // Verify token
        const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
        // Check if user still exsits
        const currentUser = await User.findById(decoded.id);
        if(!currentUser) {
            return next(new AppError('The user belonging to this token does no longer exsit.', 401));
        };
        // Check if user changed password after token was issued
        if(currentUser.passwordChangedAfter(decoded.iat)) {
            return next(new AppError('User recently changed password! Please log in again.', 401));
        }
        // Grant access to protected route
        req.user = currentUser;
        next();
    } catch(err) {
        res.status(401).json({
            status: 'fail',
            message: err
        });
    }
};
// Restric access to certain users
exports.restrictTo = (...roles) => {
    // Returning function to use req, res params
    return (req, res, next) => {
        // Check if user role is in role array provided
        if(!roles.includes(req.user.role)) {
            // If user does not have role to perform action throw error
            return next(new AppError('you do not have permission to perform this action', 403));
        };
        // If user has role to perform action continue
        next();
    };
};