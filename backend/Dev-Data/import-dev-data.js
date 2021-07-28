const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('../models/productModel');

dotenv.config({ path: './config.env' });

const DB = "mongodb+srv://khizer:dtLytOXdkmcGBk3c@cluster0.znqnu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log('DB connection successful!'));

// READ JSON FILE
const product = JSON.parse(
  fs.readFileSync(`${__dirname}/products.json`, 'utf-8')
);

// IMPORT DATA INTO DB
const importData = async () => {
  try {
    await Product.create(product);
    console.log('Data successfully loaded!');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

// DELETE ALL DATA FROM DB
const deleteData = async () => {
  try {
    await Product.deleteMany();
    console.log('Data successfully deleted!');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}
