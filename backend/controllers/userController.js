// Importing necessary dependencies
const bcrypt = require('bcryptjs'); // Library for hashing and comparing passwords securely
const jwt = require('jsonwebtoken'); // Library for creating and verifying JSON Web Tokens (JWT)
const User = require('../models/userModel'); // Importing the User model for interacting with the User collection in MongoDB

// Controller function to handle user registration
const registerUser = async (req, res) => {
  const { name, email, password } = req.body; // Destructuring the user input from the request body

  try {
    // Hashing the user's password with a salt rounds of 10 for security
    const hashedPassword = await bcrypt.hash(password, 10);

    // Creating a new user instance with the hashed password and other details
    const user = new User({ name, email, password: hashedPassword });

    // Saving the user to the database
    await user.save();

    // Responding with a success message after user registration
    res.status(201).json({ message: 'User registered successfully!' });
  } catch (error) {
    // Catching any error and responding with a 400 status code and error message
    res.status(400).json({ error: error.message });
  }
};

// Controller function to handle user login
const loginUser = async (req, res) => {
  const { email, password } = req.body; // Destructuring the user input (email and password) from the request body

  try {
    // Searching for the user in the database by email
    const user = await User.findOne({ email });
    if (!user) throw new Error('Invalid email or password'); // If the user does not exist, throw an error

    // Comparing the input password with the hashed password stored in the database
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error('Invalid email or password'); // If passwords don't match, throw an error

    // Creating a JWT token for the user, signing with the user's ID and setting an expiration time of 1 hour
    const token = jwt.sign({ id: user._id }, 'secret', { expiresIn: '1h' });

    // Responding with the generated token
    res.json({ token });
  } catch (error) {
    // Catching any error during login and responding with a 401 status code and error message
    res.status(401).json({ error: error.message });
  }
};

// Exporting the registerUser and loginUser functions to be used in routes
module.exports = { registerUser, loginUser };
