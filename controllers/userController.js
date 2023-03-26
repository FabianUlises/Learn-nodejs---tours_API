const User = require('./../models/userModel');
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
exports.createUser = (req, res) => {
    res.send('users post stub route');
};
exports.getUser = (req, res) => {
    res.send('get user stub route');
};
exports.updateUser = (req, res) => {
    res.send('update user stub route');
};
exports.deleteUser = (req, res) => {
    res.send('delete user stub route');
};