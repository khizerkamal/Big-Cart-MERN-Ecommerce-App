// const dotenv = require('dotenv')
const mongoose = require('mongoose')
const cloudinary = require ('cloudinary')

if(process.env.NODE_ENV !== 'PRODUCTION'){
    require('dotenv').config({path: 'backend/config.env'})
}

const app = require('./app')

//Setting up Cloudinary Configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

// const DB = process.env.DATABASE.replace('<PASSWORD>',process.env.DATABASE_PASSWORD)
const DB = process.env.DATABASE

mongoose
    .connect(DB,{
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
    })
    .then(() => console.log('DB Connection Successful!'))

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server is running on port ${port} in ${process.env.NODE_ENV} mode.`)
})