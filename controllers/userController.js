// Model
const User = require('./../models/userModel');
// Dependencies
const AppError = require('./../utils/appError');
// Filter body req to accept allowed fields only
const filterObj = (obj, ...allowedFields) => {
    // Initial new object to return
    const newObj = {};
    // Loop through obj provided
    Object.keys(obj).forEach((el) => {
        // If obj key is in allowedfields add key to new obj
        if(allowedFields.includes(el)) newObj[el] = obj[el]
    });
    // Return new obj
    return newObj;
};
// Get all user from db
exports.getAllUsers = async(req, res) => {
    try {
        // Getting user from db
        const users = await User.find();
        res.status(200).json({
            status: 'success',
            data: users
        });
    } catch(err) {
        res.status(400).json({
            status: 'fail',
            message: err
        });
    }
};
// create a user
exports.createUser = (req, res) => {
    res.send('users post stub route');
};
// Get user from db
exports.getUser = (req, res) => {
    res.send('get user stub route');
};
// Update user for admin
exports.updateUser = (req, res) => {
    res.send('update user stub route');
};
// Update user for user
exports.updateMe = async (req, res, next) => {
    // Create error if user post password with body request
    if(req.body.password || req.body.passwordConfirm) {
        return next(new AppError('This route is not for password updates. Please user /updateMyPassword'), 400);
    }
    // Update user doc
    // Filter body req to only accept needed inputs
    const filteredBody = filterObj(req.body, 'name', 'email');
    const user = await User.findByIdAndUpdate(req.user.id, filteredBody, { new: true, runValidators: true });
    res.status(200).json({
        status: 'success',
        data: user
    });
};
// Delete user for user
exports.deleteMe = async (req, res) => {
    const user = await User.findByIdAndUpdate(req.user.id, { active: false });
    res.status(204).json({
        status: 'success',
        data: null
    });
};
// Delete user for admin
exports.deleteUser = (req, res) => {
    res.send('delete user stub route');
};