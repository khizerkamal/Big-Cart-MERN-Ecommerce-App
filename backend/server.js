const dotenv = require('dotenv')
const mongoose = require('mongoose')

dotenv.config({path: './config.env'})

const app = require('./app')
console.log(process.env.DATABASE_PASSWORD)
// const DB = process.env.DATABASE.replace('<PASSWORD>',process.env.DATABASE_PASSWORD)
const DB = "mongodb+srv://khizer:dtLytOXdkmcGBk3c@cluster0.znqnu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

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