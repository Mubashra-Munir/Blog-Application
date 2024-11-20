// const express = require('express');
// const router = express.Router();
// const upload = require('../config/upload'); // Import Multer config
// const Post = require('../models/postModel'); // Post model

// // Route to create a new post with image
// router.post('/posts', upload.single('image'), async (req, res) => {
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

// module.exports = router; // Export routes

//////////////////////////////

// const express = require('express');
// const multer = require('multer');
// const router = express.Router();
// const Post = require('../models/postModel'); // Post model
// const path = require('path');

// // Multer Storage Configuration
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     // Set the folder where you want to store the uploaded images
//     cb(null, 'uploads/'); // Make sure 'uploads' folder exists
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
// router.post('/posts', upload.single('image'), async (req, res) => {
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

// module.exports = router; // Export routes
// ///////////////////////////


