// Importing mongoose to interact with MongoDB
const mongoose = require('mongoose');

// Function to establish a connection to the MongoDB database
const connectDB = async () => {
  try {
    // Attempting to connect to MongoDB using the URI stored in environment variables
    // useNewUrlParser and useUnifiedTopology are options to handle MongoDB driver deprecations
    await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

    // If the connection is successful, log a message indicating MongoDB is connected
    console.log('MongoDB connected');
  } catch (error) {
    // If the connection fails, log the error message and exit the process with a non-zero status code
    console.error('MongoDB connection error:', error.message);
    process.exit(1); // Exiting the process with status code 1 to indicate a failure
  }
};

// Exporting the connectDB function to be used in other parts of the application (e.g., server.js)
module.exports = connectDB;
