// Importing necessary dependencies
const express = require('express'); // Express.js framework for building the server
const dotenv = require('dotenv'); // To load environment variables from .env file
const connectDB = require('./config/db'); // Function to connect to the MongoDB database
const userRoutes = require('./routes/userRoutes'); // Importing user-related routes
const postRoutes = require('./routes/postRoutes'); // Importing post-related routes



// Configure environment variables from the .env file
dotenv.config();

// Establishing a connection to the MongoDB database
connectDB();

// Initialize the Express app
const app = express();

// Middleware for handling Cross-Origin Resource Sharing (CORS)
const cors = require('cors'); 
app.use(express.json()); // Middleware to parse incoming JSON requests
app.use(cors()); // Enabling CORS for handling requests from different origins

// Defining route handlers for different API endpoints
app.use('/api/users', userRoutes); // User routes: handling user-related API calls
app.use('/api/posts', postRoutes); // Post routes: handling post-related API calls



// Starting the Express server on port 5000 and logging the message when the server is up
app.listen(5000, () => console.log('Server running on port 5000'));



