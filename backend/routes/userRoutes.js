// Importing necessary dependencies
const express = require('express'); // Express.js framework for routing
const { registerUser, loginUser } = require('../controllers/userController'); // Importing the controller functions for handling user registration and login
const router = express.Router(); // Creating a new router instance to handle specific routes

// Defining the route for user registration
router.post('/register', registerUser); // POST request to /api/users/register triggers the registerUser function

// Defining the route for user login
router.post('/login', loginUser); // POST request to /api/users/login triggers the loginUser function

// Exporting the router to be used in the main server file (e.g., app.js or server.js)
module.exports = router;


