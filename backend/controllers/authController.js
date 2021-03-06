const jwt = require('jsonwebtoken')
const { promisify } = require('util')
const crypto = require('crypto')
const cloudinary = require('cloudinary')

const User = require('../models/userModel')
const catchAsync = require('../utils/catchAsync')
const AppError = require('../utils/appError')
const sendEmail = require('../utils/email')


const createSendToken = (user,statusCode,res) => {
    const token = user.signToken();
    const cookieOptions = {
        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
        httpOnly: true
    }

    if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;
    res.cookie('token',token,cookieOptions)

    // Remove Password from output
    user.password = undefined;

    res.status(statusCode).json({
        success: true,
        token,
        user
    })
}

exports.signup = catchAsync(async (req,res,next) => {
    const { name, email, password } = req.body;
    const result = await cloudinary.v2.uploader.upload(req.body.avatar,{
        folder: 'avatars',
        width: 150,
        crop: "scale",
    })
    const user = await User.create({
        name,
        email,
        password,
        avatar: {
            public_id: result.public_id,
            url: result.secure_url
        }
    })
    createSendToken(user, 201, res) 
})

exports.login = catchAsync(async (req,res,next) => {
    const { email,password } = req.body;

    // 1) Check if email and password exist
    if (!email || !password) {
        return next(new AppError('Please enter email & password', 400))
    }

    // 2) Check if user exists && password is correct
    const user = await User.findOne({ email }).select('+password') 
    if (!user || !await user.correctPassword(password, user.password)) {
        return next(new AppError('Incorrect email or password ', 401))
    }

    // 3) If everything ok then send token to client
    createSendToken(user, 200, res)
})

exports.logout = catchAsync(async (req,res,next) => {

    res.cookie('token',null,{
        expires: new Date(Date.now()),
        httpOnly: true
    })

    res.status(200).json({
        status: 'success',
        message: 'Logged Out'
    })
})

// Get currently logged in user details
exports.getUserProfile = catchAsync(async (req,res,next) => {
    const user = await User.findById(req.user.id);

    res.status(200).json({
        status: 'success',
        user
    })
})

// Update/Change Password
exports.updatePassword = catchAsync(async (req,res,next) => {
    const user = await User.findById(req.user.id).select('+password')
    if (!req.body.oldPassword) {
        return next(new AppError('Please enter your current password', 404))
    }    
    const isMatch = await user.correctPassword(req.body.oldPassword, user.password)
    if(!isMatch) return next(new AppError('Old password is incorrect'))
    user.password = req.body.password;
    await user.save();
    createSendToken(user,200,res);
})

// Update Profile
exports.updateProfile = catchAsync(async (req,res,next) => {
    const updatedUserData = {
        name: req.body.name,
        email: req.body.email
    }
    // UPDATE AVATAR
    if (req.body.avatar !== '') {
        const user = await User.findById(req.user.id)
        const image_id = user.avatar.public_id;
        await cloudinary.v2.uploader.destroy(image_id)
        const result = await cloudinary.v2.uploader.upload(req.body.avatar,{
            folder: 'avatars',
            width: 150,
            crop: "scale",
        })
        updatedUserData.avatar = {
            public_id: result.public_id,
            url: result.secure_url
        }
    }
    const user = await User.findByIdAndUpdate(req.user.id,updatedUserData,{
        new: true,
        runValidators: true,
        useFindAndModify: false
    })
    res.status(200).json({
        success: true
    })
})

//////// PROTECTING ROUTES ////////
exports.protect = catchAsync(async (req,res,next) => {
    const { token } = req.cookies;
    if (!token) {
        return next(new AppError('You are not logged in! PLease log in to get access.', 401))
    }
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET)
    req.user = await User.findById(decoded.id)
    next()
})

////// Authorizing Roles ///////
exports.restrictTo = (...roles) => {
    return (req,res,next) => {
        if (!roles.includes(req.user.role)) {
            return next(new AppError('You do not have permission to perform this action', 403))
        }
        next()
    }
}

////// Forgot Password //////
exports.forgotPassword = catchAsync(async (req,res,next) => {
    const user = await User.findOne({ email: req.body.email })
    if (!user) {
        return next(new AppError('There is no user with email address.', 404))
    }
    const resetToken = user.createPasswordResetToken();
    await user.save({ validateBeforeSave: false });

    const resetURL = `${req.proocol}://${req.get('host')}/resetPassword/${resetToken}`
    
    const message = `Forgot your password? Submit a PATCH request with your new password and passwordConfirm to:
    ${resetURL}\nIf you didn't forget your password, please ignore this email!`
    
    try {
        await sendEmail({
          email: user.email,
          subject: 'Big-Cart Password Reset (valid for 10 min)',
          message,
        })
        res.status(200).json({
          success: true,
          message: `Token sent to ${user.email}`,
        })
      } catch (err) {
        user.passwordResetToken = undefined
        user.passwordResetExpires = undefined
        await user.save({ validateBeforeSave: false })
        next(
          new AppError('There was an error sending the email. Try again later!', 500)
        )
      }
    })
    
////// Reset Password //////
exports.resetPassword = catchAsync(async (req, res, next) => {
    // 1) Get user based on the tokens
    const hashedToken = crypto
      .createHash('sha256')
      .update(req.params.token)
      .digest('hex')
  
    // console.log(hashedToken)
    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpire: { $gt: Date.now() },
    })
    
    // 2) If token has not expired, and there is user, set the new password
    if (!user) {
      return next(new AppError('Token is invalid or has expired', 400)) // 400-> bad req
    }
  
    if (req.body.password != req.body.confirmPassword) {
        return next(new AppError('Password does not match', 400))
    }

    user.password = req.body.password;
    
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();
  
    // 3) Update changedPasswordAt property for the user
    // 4) Log the user in, send jwt
    createSendToken(user, 200, res)
})
  
// ADMIN ROUTHANDLERS

//GET All Users     /api/v1/admin/allUsers
exports.allUsers = catchAsync(async (req,res,next) => {
    const usersCount = await User.countDocuments();
    const users = await User.find();

    res.status(200).json({
        message: "success",
        totalUsers: usersCount,
        users
    })
})

//Get User Details      /api/v1/admin/user/:id
exports.getUserDetails = catchAsync(async (req,res,next) => {
    const user = await User.findById(req.params.id)

    if (!user) {
        return next(new AppError(`User not found with id: ${req.params.id}`, 404))
    }

    res.status(200).json({
        message: "success",
        user
    })
})

// Update Profile   /api/v1/admin/user/:id
exports.updateUser = catchAsync(async (req,res,next) => {
    const updatedUserData = {
        name: req.body.name,
        email: req.body.email,
        role: req.body.role
    }

    const user = await User.findByIdAndUpdate(req.params.id,updatedUserData,{
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        message: 'success'
    })
})

// Delete User      /api/v1/admin/user/:id
exports.deleteUser = catchAsync(async (req,res,next) => {
    const user = await User.findById(req.params.id)

    if (!user) {
        return next(new AppError(`User not found with id: ${req.params.id}`, 404))
    }

    //Remove avatar from cloudinary - TODO

    await user.remove();
    res.status(200).json({
        message: "success"
    })
})
