// Importing necessary dependencies
const jwt = require('jsonwebtoken'); // JSON Web Token library for verifying tokens
const User = require('../models/userModel'); // Importing the User model to fetch user data from the database

// Middleware function to authenticate requests based on JWT
const authenticate = async (req, res, next) => {
  // Extracting the token from the Authorization header (assumes 'Bearer <token>' format)
  const token = req.headers.authorization?.split(' ')[1];

  try {
    // If no token is provided, throw an Unauthorized error
    if (!token) throw new Error('Unauthorized');

    // Verifying the token using the secret key
    const decoded = jwt.verify(token, 'secret'); // 'secret' should ideally be replaced with an environment variable

    // Fetch the user from the database using the decoded user ID from the token
    req.user = await User.findById(decoded.id);

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    // If token verification fails, respond with an Unauthorized status code
    res.status(401).json({ error: 'Unauthorized' });
  }
};

// Exporting the authenticate middleware to be used in routes
module.exports = { authenticate };

////////////////////

// // Importing necessary dependencies
// const jwt = require('jsonwebtoken'); // JSON Web Token library for verifying tokens
// const User = require('../models/userModel'); // Importing the User model to fetch user data from the database
// require('dotenv').config(); // Import environment variables

// // Middleware function to authenticate requests based on JWT
// const authenticate = async (req, res, next) => {
//   // Extracting the token from the Authorization header (assumes 'Bearer <token>' format)
//   const token = req.headers.authorization?.split(' ')[1];

//   try {
//     // If no token is provided, throw an Unauthorized error
//     if (!token) return res.status(401).json({ error: 'No token provided' });

//     // Verifying the token using the secret key from environment variable
//     const decoded = jwt.verify(token, process.env.JWT_SECRET); // Use JWT_SECRET from environment variables

//     // Fetch the user from the database using the decoded user ID from the token
//     const user = await User.findById(decoded.id);
    
//     // If user not found, respond with an error
//     if (!user) return res.status(404).json({ error: 'User not found' });

//     // Attaching the user data to the request object for further use
//     req.user = user;

//     // Proceed to the next middleware or route handler
//     next();
//   } catch (error) {
//     // Handle different error scenarios
//     if (error.name === 'TokenExpiredError') {
//       return res.status(401).json({ error: 'Token has expired' });
//     }
//     return res.status(401).json({ error: 'Unauthorized: Invalid token' });
//   }
// };

// // Exporting the authenticate middleware to be used in routes
// module.exports = { authenticate };

///////////////////////

// const jwt = require('jsonwebtoken'); // JSON Web Token library for verifying tokens
// const User = require('../models/userModel'); // Importing the User model to fetch user data from the database
// require('dotenv').config(); // Import environment variables

// const authenticate = async (req, res, next) => {
//   const token = req.headers.authorization?.split(' ')[1];

//   try {
//     if (!token) return res.status(401).json({ error: 'No token provided' });

//     console.log('Token received:', token); // Log the token
//     const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token
//     console.log('Decoded token:', decoded); // Log decoded data

//     const user = await User.findById(decoded.id);
//     if (!user) return res.status(404).json({ error: 'User not found' });

//     req.user = user; // Attach user to request
//     next();
//   } catch (error) {
//     console.error('Error during authentication:', error); // Log the error
//     if (error.name === 'TokenExpiredError') {
//       return res.status(401).json({ error: 'Token has expired' });
//     }
//     return res.status(401).json({ error: 'Unauthorized: Invalid token' });
//   }
// };

// // // Exporting the authenticate middleware to be used in routes
// module.exports = { authenticate };

