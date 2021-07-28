const express = require('express')
const morgan = require('morgan')
const productRoutes = require('./routes/productRoutes')
const userRoutes = require('./routes/userRoutes')
const AppError = require('./utils/appError')
const globalErrorHandler = require('./controllers/errorController')


const app = express();
app.use(express.json())

if (process.env.NODE_ENV == 'development') {
    app.use(morgan('dev'))
}

app.use('/api/v1/products',productRoutes)
app.use('/api/v1/user', userRoutes)


// HANDLING UNHANDLED ROUTES
app.all('*', (req, res, next) => {
    next(new AppError(`Cann't Find ${req.originalUrl} on this Server!`, 404))
})
  
app.use(globalErrorHandler);

module.exports = app;