const express = require('express')
const cookieParser = require('cookie-parser')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cloudinary = require ('cloudinary')

const productRoutes = require('./routes/productRoutes')
const userRoutes = require('./routes/userRoutes')
const adminRoutes = require('./routes/adminRoutes')
const AppError = require('./utils/appError')
const globalErrorHandler = require('./controllers/errorController')


const app = express();

app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(cookieParser())

//Setting up Cloudinary Configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

if (process.env.NODE_ENV == 'development') {
    app.use(morgan('dev'))
}

app.use('/api/v1/products',productRoutes)
app.use('/api/v1/user',userRoutes)
app.use('/api/v1/admin', adminRoutes)


// HANDLING UNHANDLED ROUTES
app.all('*', (req, res, next) => {
    next(new AppError(`Cann't Find ${req.originalUrl} on this Server!`, 404))
})
  
app.use(globalErrorHandler);

module.exports = app;