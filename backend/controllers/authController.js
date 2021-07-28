const User = require('../models/userModel')
const catchAsync = require('../utils/catchAsync')
const AppError = require('../utils/appError')

exports.signup = catchAsync(async (req,res,next) => {
    const { name, email, password } = req.body;

    const user = await User.create({
        name,
        email,
        password,
        avatar: {
            public_id: 'kdknvsdkvn',
            url: 'vsdvsdvsdsdv'
        }
    })

    res.status(201).json({
        status: 'success',
        data: {
            user
        }
    })
})