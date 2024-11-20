// Importing necessary dependencies
const express = require('express'); // Express.js framework for routing
const { createPost, getPosts, updatePost, deletePost } = require('../controllers/postController'); // Importing controller functions for handling post-related actions
const { authenticate } = require('../middleware/authMiddleware'); // Importing middleware for user authentication
const router = express.Router(); // Creating a new router instance to handle post-related routes
// const upload = require('../config/upload'); // Make sure the upload middleware is correctly set up
// Defining the route for creating a new post
router.post('/', authenticate, createPost); // POST request to /api/posts triggers createPost function, with authentication middleware

// Defining the route for fetching all posts
router.get('/', getPosts); // GET request to /api/posts triggers getPosts function

// Defining the route for updating a specific post
router.put('/:id', authenticate, updatePost); // PUT request to /api/posts/:id triggers updatePost function, with authentication middleware

// Defining the route for deleting a specific post
router.delete('/:id', authenticate, deletePost); // DELETE request to /api/posts/:id triggers deletePost function, with authentication middleware

// Exporting the router to be used in the main server file (e.g., app.js or server.js)

// router.post('/posts', upload.single('image'), createPost); // Ensure 'createPost' is properly imported
module.exports = router;


///////////////////

// // Importing necessary dependencies
// const express = require('express'); // Express.js framework for routing
// const { createPost, getPosts, updatePost, deletePost } = require('../controllers/postController'); // Importing controller functions for handling post-related actions
// const { authenticate } = require('../middleware/authMiddleware'); // Importing middleware for user authentication
// const router = express.Router(); // Creating a new router instance to handle post-related routes
// const upload = require('../config/upload'); // Ensure the upload middleware is correctly set up

// // Defining the route for creating a new post
// router.post('/', authenticate, upload.single('image'), createPost); // POST request to /api/posts triggers createPost function, with authentication and file upload middleware

// // Defining the route for fetching all posts
// router.get('/', getPosts); // GET request to /api/posts triggers getPosts function

// // Defining the route for updating a specific post
// router.put('/:id', authenticate, updatePost); // PUT request to /api/posts/:id triggers updatePost function, with authentication middleware

// // Defining the route for deleting a specific post
// router.delete('/:id', authenticate, deletePost); // DELETE request to /api/posts/:id triggers deletePost function, with authentication middleware

// // Exporting the router to be used in the main server file (e.g., app.js or server.js)
// module.exports = router;

// ///////////////////////

// const express = require('express');
// const multer = require('multer');
// const router = express.Router();
// const Post = require('../models/postModel'); // Post model
// const path = require('path');
// const fs = require('fs');

// // Multer Storage Configuration
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     // Set the folder where you want to store the uploaded images
//     const uploadPath = 'uploads/';
//     // Ensure the uploads folder exists or create it if necessary
//     if (!fs.existsSync(uploadPath)) {
//       fs.mkdirSync(uploadPath, { recursive: true });
//     }
//     cb(null, uploadPath);
//   },
//   filename: (req, file, cb) => {
//     // Set the file name for the uploaded image
//     cb(null, Date.now() + path.extname(file.originalname)); // Example: 1637856287631.jpg
//   }
// });

// // File filter (to ensure only images are uploaded)
// const fileFilter = (req, file, cb) => {
//   const allowedTypes = /jpeg|jpg|png|gif/;
//   const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
//   const mimetype = allowedTypes.test(file.mimetype);

//   if (extname && mimetype) {
//     return cb(null, true);
//   } else {
//     return cb(new Error('Only image files are allowed'), false);
//   }
// };

// // Initialize Multer
// const upload = multer({
//   storage,
//   limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB limit
//   fileFilter
// });

// // Route to create a new post with an image
// router.post('/', upload.single('image'), async (req, res) => {
//   try {
//     const { title, content } = req.body;
//     const image = req.file ? req.file.path : null; // Get the file path of the uploaded image

//     // Create a new post
//     const newPost = new Post({
//       title,
//       content,
//       image, // Store the image path in the database
//     });

//     // Save the new post
//     await newPost.save();

//     res.status(201).json(newPost); // Respond with the created post
//   } catch (error) {
//     res.status(400).json({ error: error.message }); // Handle errors
//   }
// });

// module.exports = router;


////////////////////////////


// const express = require('express');
// const multer = require('multer');
// const router = express.Router();
// const Post = require('../models/postModel'); // Post model
// const path = require('path');
// const fs = require('fs');
// const { authenticate } = require('../middleware/authMiddleware'); // Assuming you have this middleware for authentication

// // Multer Storage Configuration
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     const uploadPath = 'uploads/'; // Folder where the image will be stored

//     // Ensure the 'uploads' folder exists or create it if it doesn't
//     if (!fs.existsSync(uploadPath)) {
//       fs.mkdirSync(uploadPath, { recursive: true });
//     }
//     cb(null, uploadPath);
//   },
//   filename: (req, file, cb) => {
//     // Setting the file name based on current timestamp and original file extension
//     cb(null, Date.now() + path.extname(file.originalname)); // E.g., 1637856287631.jpg
//   }
// });

// // File filter (to ensure only images are uploaded)
// const fileFilter = (req, file, cb) => {
//   const allowedTypes = /jpeg|jpg|png|gif/;
//   const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
//   const mimetype = allowedTypes.test(file.mimetype);

//   if (extname && mimetype) {
//     return cb(null, true);
//   } else {
//     return cb(new Error('Only image files are allowed'), false);
//   }
// };

// // Initialize Multer with the storage configuration, file size limit, and filter
// const upload = multer({
//   storage,
//   limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB limit
//   fileFilter
// });

// // Route to create a new post with an image
// router.post('/', authenticate, upload.single('image'), async (req, res) => {
//   try {
//     const { title, content } = req.body; // Destructure title and content from the request body
//     const image = req.file ? req.file.path : null; // Get the image file path if an image is uploaded

//     // Create a new post object
//     const newPost = new Post({
//       title,
//       content,
//       image, // Store the image path in the database if available
//       user: req.user.id // Assuming `req.user` contains the authenticated user
//     });

//     // Save the new post to the database
//     await newPost.save();

//     res.status(201).json(newPost); // Respond with the created post
//   } catch (error) {
//     // Handle errors and respond with the error message
//     console.error(error); // Log the error for debugging
//     res.status(400).json({ error: error.message });
//   }
// });

// module.exports = router; // Export the router to be used in the main app
