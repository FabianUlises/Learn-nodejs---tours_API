// Dependencies
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide a name']
    },
    email: {
        type: String,
        required: [true, 'Please provide an email'],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'Please provide a valid email']
    },
    photo: String,
    password: {
        type: String,
        required: [true, 'Please provide a password'],
        minlength: 8
    },
    passwordConfirm: {
        type: String,
        required: [true, 'Please confirm your password'],
        validate: {
            validator: function(el) {
                return el === this.password
            },
            message: 'Password does not match'
        }
    }
});
userSchema.pre('save', async function(next) {
    // Only running if password was modified
    if(!this.isModified('password')) return next();
    // Hashing password with bcrypt
    this.password = await bcrypt.hash(this.password, 12);
    // Deleting confirmpassword
    this.passwordConfirm = undefined;
    next();
});
const User = mongoose.model('User', userSchema);
module.exports = User; 