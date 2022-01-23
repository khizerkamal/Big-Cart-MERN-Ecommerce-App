const express = require('express')
const cookieParser = require('cookie-parser')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const fileUpload = require ('express-fileupload')
const path = require ('path')

const productRoutes = require('./routes/productRoutes')
const userRoutes = require('./routes/userRoutes')
const adminRoutes = require('./routes/adminRoutes')
const paymentRoutes = require('./routes/paymentRoutes')
const orderRoutes = require('./routes/orderRoutes')
const AppError = require('./utils/appError')
const globalErrorHandler = require('./controllers/errorController')


const app = express();

app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(fileUpload())
app.use(cookieParser())


if (process.env.NODE_ENV == 'development') {
    app.use(morgan('dev'))
}

app.use('/api/v1/products',productRoutes)
app.use('/api/v1/user',userRoutes)
app.use('/api/v1/admin',adminRoutes)
app.use('/api/v1/payment',paymentRoutes)
app.use('/api/v1/order', orderRoutes)

// HANDLING UNHANDLED ROUTES
app.all('*', (req, res, next) => {
    next(new AppError(`Cann't Find ${req.originalUrl} on this Server!`, 404))
})

// For Deployment
if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname, '../frontend/build')))
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../frontend/build/index.html'))
    })
}

  
app.use(globalErrorHandler);

module.exports = app;