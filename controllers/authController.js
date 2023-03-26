// Model
const User = require('./../models/userModel');
exports.signUp = async(req, res) => {
    try {
        // Create upser from input
        const user = await User.create(req.body);
        res.status(201).json({
            status: 'success',
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