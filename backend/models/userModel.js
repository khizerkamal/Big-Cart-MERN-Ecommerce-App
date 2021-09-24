const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const crypto = require('crypto')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter your name'],
        maxLength: [30, 'Your name cannot exceed 30 characters']
    },
    email: {
        type: String,
        required: [true, 'Please enter your email'],
        unique: true,
        validate: [validator.isEmail, 'Please enter valid email address']
    },
    password: {
        type: String,
        required: [true, 'Please enter your password'],
        minlength: [6, 'Your password must be longer than 6 characters'],
        select: false
    },
    // passwordConfirm: {
    //     type: String,
    //     required: [true, 'Please confirm your password'],
    //     validate: {
    //       // This only works on CREATE and SAVE !!!
    //       validator: function (el) {
    //         return el === this.password
    //       },
    //       message: 'Passwords are not the same',
    //     },
    //   },
    avatar: {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date
})

// Encrypting Password before saving into DB
userSchema.pre('save',async function (next) {  //cannot use this inside arrow function
    if (!this.isModified('password')) {
        return next()
    }
    this.password = await bcrypt.hash(this.password,12)
    //this.passwordConfirm = undefined;
    next()
})

//Generate jwt
userSchema.methods.signToken = function() {
    return jwt.sign(
        { id: this._id },
        process.env.JWT_SECRET,
        {expiresIn: process.env.JWT_EXPIRES_IN}
    )
}
// Compare Password for Login
userSchema.methods.correctPassword = async function (candidatePassword, userPassword) {
    return await bcrypt.compare(candidatePassword, userPassword)
}

// userSchema.methods.correctPassword = async function (candidatePassword) {
//     return await bcrypt.compare(candidatePassword, this.password)
// }

// Creating Reset password Token
userSchema.methods.createPasswordResetToken = function () {
    const resetToken = crypto.randomBytes(32).toString('hex');

    this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    this.resetPasswordExpire = Date.now() + 10 * 60 * 1000

    return resetToken;
}

const User = mongoose.model('User',userSchema);

module.exports = User;