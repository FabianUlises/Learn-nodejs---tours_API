// Dependencies
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
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
        minlength: 8,
        select: false
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
    },
    passwordChangedAt: {
        type: Date
    },
    role: {
        type: String,
        enum: ['user', 'guide', 'lead-guide', 'admin'],
        default: 'user'
    },
    passwordResetToken: String,
    passwordResetExpires: Date,
    active: {
        type: Boolean,
        defualt: true,
        select: false
    }
});
// Middleware
// Only get documents with active set to true and hide field
userSchema.pre(/^find/, function(next) {
    this.find({ active: {$ne: false} });
    next();
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
userSchema.pre('save', function(next) {
    // If password isnt modified or new continue
    if(!this.isModified('password') || this.isNew) return next();
    // Update user model field
    this.passwordChangedAt = Date.now() - 1000;
    next();
});
// Methods
// Function to check login password
userSchema.methods.correctPassword = function(canidatePassword, userPassword) {
    return bcrypt.compare(canidatePassword, userPassword);
};
// Check if user changed password after jwt was issued
userSchema.methods.passwordChangedAfter = function(JWTTimestamp) {
    if(this.passwordChangedAt) {
        // Convert timestamp to time from date
        const changedTimestamp = parseInt(this.passwordChangedAt.getTime() / 1000, 10);
        // If password was changed  it will be greater than jwttimestamp meaning true
        return JWTTimestamp < changedTimestamp;
    }
    // False means not changed
    return false;
};
// Generate random token to reset password
userSchema.methods.createPasswordResetToken = function() {
    // Generate reset token using crypto
    const resetToken = crypto.randomBytes(32).toString('hex');
    // Hash token and assign to db field passwordresettoken
    this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    // Set expiration time to reset token
    this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
    console.log(resetToken, this.passwordResetToken);
    return resetToken;
};
const User = mongoose.model('User', userSchema);
module.exports = User; 