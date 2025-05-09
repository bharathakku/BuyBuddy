const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');
const connectDB = require('./config/db');
const products = require('./data/products');

// Load env variables
dotenv.config();

// Connect to MongoDB
connectDB();

const importData = async () => {
  try {
    console.log('Clearing old products...');
    await Product.deleteMany();

    console.log('Seeding new products...');
    await Product.insertMany(products);

    console.log('✅ Data Imported Successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error importing data:', error.message);
    process.exit(1);
  }
};

importData();
