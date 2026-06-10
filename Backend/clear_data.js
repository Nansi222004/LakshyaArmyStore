const mongoose = require('mongoose');
require('dotenv').config();

const cleanDatabase = async () => {
  try {
    const mongoUri = process.env.MONGODB_URL || 'mongodb://localhost:27017/mynzo';
    console.log('Connecting to MongoDB at:', mongoUri);
    await mongoose.connect(mongoUri);
    console.log('Connected successfully!');

    // Clean Collections
    console.log('Clearing Category Chips...');
    await mongoose.connection.collection('categorychips').deleteMany({});
    
    console.log('Clearing SubCategory Chips...');
    await mongoose.connection.collection('subcategorychips').deleteMany({});

    console.log('Clearing Products...');
    await mongoose.connection.collection('products').deleteMany({});

    console.log('Database clean up completed successfully!');
    process.exit(0);
  } catch (err) {
    console.error('Error cleaning database:', err);
    process.exit(1);
  }
};

cleanDatabase();
