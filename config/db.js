const mongoose = require('mongoose');
require('dotenv').config();

async function connect() {
  try {
    // Check if MONGO_URI is properly set in the environment variables
    const mongoURI = process.env.MONGO_URI;
    
    if (!mongoURI) {
      throw new Error('MONGO_URI is not defined in your .env file.');
    }

    // Connect to MongoDB using the provided URI
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Connected to MongoDB!");
  } catch (err) {
    console.error("Error connecting to MongoDB: ", err.message);
    process.exit(1); // Exit the process if the connection fails
  }
}

module.exports = { connect };