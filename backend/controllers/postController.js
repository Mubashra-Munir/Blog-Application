// // Importing the Post model to interact with the Post collection in MongoDB
// const Post = require('../models/postModel');

// // Controller function to create a new post
// const createPost = async (req, res) => {
//   const { title, content } = req.body; // Destructuring the title and content from the request body

//   try {
//     // Creating a new post with the provided title, content, and the user ID from the authenticated user
//     const post = new Post({ title, content, user: req.user.id });

//     // Saving the post to the database
//     await post.save();

//     // Responding with a 201 status code and the created post
//     res.status(201).json(post);
//   } catch (error) {
//     // Catching any error and responding with a 400 status code and error message
//     res.status(400).json({ error: error.message });
//   }
// };

// // /////////////////////////////////////////

// const getPosts = async (req, res) => {
//   try {
//     // Fetching all posts from the database, sorting them, and populating the 'user' field with user data (name and email)
//     const posts = await Post.find()
//       .populate('user', 'name email') // Populate user data
//       .sort({ createdAt: -1 }); // Sort posts in ascending order by createdAt

//     // Responding with the fetched posts
//     res.json(posts);
//   } catch (error) {
//     // Catching any error and responding with a 500 status code and error message
//     res.status(500).json({ error: error.message });
//   }
// };


// // Controller function to update an existing post
// const updatePost = async (req, res) => {
//   const { id } = req.params; // Extracting the post ID from the request parameters
//   const { title, content } = req.body; // Destructuring the title and content from the request body

//   try {
//     // Finding and updating the post by ID, returning the updated post
//     const post = await Post.findByIdAndUpdate(id, { title, content }, { new: true });

//     // If the post is not found, throw an error
//     if (!post) throw new Error('Post not found');

//     // Responding with the updated post
//     res.json(post);
//   } catch (error) {
//     // Catching any error and responding with a 400 status code and error message
//     res.status(400).json({ error: error.message });
//   }
// };

// // Route to create a new post (including image upload)
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



// // Controller function to delete a post
// const deletePost = async (req, res) => {
//   const { id } = req.params; // Extracting the post ID from the request parameters

//   try {
//     // Finding and deleting the post by ID
//     const post = await Post.findByIdAndDelete(id);

//     // If the post is not found, throw an error
//     if (!post) throw new Error('Post not found');

//     // Responding with a success message
//     res.json({ message: 'Post deleted successfully' });
//   } catch (error) {
//     // Catching any error and responding with a 400 status code and error message
//     res.status(400).json({ error: error.message });
//   }
// };

// // Exporting the createPost, getPosts, updatePost, and deletePost functions to be used in routes
// module.exports = { createPost, getPosts, updatePost, deletePost };

//////////////////////////////////



// // Import necessary modules
// const express = require('express');
// const multer = require('multer');
// const Post = require('../models/postModel'); // Import your Post model

// // Create a new router instance
// const router = express.Router();

// // Configure multer for image uploads
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'uploads/'); // Specify the directory where the file will be saved
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + '-' + file.originalname); // Set the filename
//   },
// });

// const upload = multer({ storage }); // Initialize multer with the storage configuration

// // Controller function to create a new post (including image upload)
// const createPost = async (req, res) => {
//   const { title, content } = req.body; // Destructuring the title and content from the request body
//   const image = req.file ? req.file.path : null; // Get the file path of the uploaded image

//   try {
//     // Creating a new post with the title, content, and image path
//     const post = new Post({
//       title,
//       content,
//       image, // Store the image path in the database
//       user: req.user.id, // You may need to handle user authentication
//     });

//     // Saving the post to the database
//     await post.save();

//     // Responding with a 201 status code and the created post
//     res.status(201).json(post);
//   } catch (error) {
//     // Catching any error and responding with a 400 status code and error message
//     res.status(400).json({ error: error.message });
//   }
// };

// // Controller function to get all posts
// const getPosts = async (req, res) => {
//   try {
//     // Fetching all posts from the database, sorting them, and populating the 'user' field with user data (name and email)
//     const posts = await Post.find()
//       .populate('user', 'name email') // Populate user data
//       .sort({ createdAt: -1 }); // Sort posts in descending order by createdAt

//     // Responding with the fetched posts
//     res.json(posts);
//   } catch (error) {
//     // Catching any error and responding with a 500 status code and error message
//     res.status(500).json({ error: error.message });
//   }
// };

// // Controller function to update an existing post
// const updatePost = async (req, res) => {
//   const { id } = req.params; // Extracting the post ID from the request parameters
//   const { title, content } = req.body; // Destructuring the title and content from the request body

//   try {
//     // Finding and updating the post by ID, returning the updated post
//     const post = await Post.findByIdAndUpdate(id, { title, content }, { new: true });

//     // If the post is not found, throw an error
//     if (!post) throw new Error('Post not found');

//     // Responding with the updated post
//     res.json(post);
//   } catch (error) {
//     // Catching any error and responding with a 400 status code and error message
//     res.status(400).json({ error: error.message });
//   }
// };

// // Route to create a new post (including image upload)
// router.post('/posts', upload.single('image'), createPost); // Use the multer upload middleware for file handling

// // Controller function to delete a post
// const deletePost = async (req, res) => {
//   const { id } = req.params; // Extracting the post ID from the request parameters

//   try {
//     // Finding and deleting the post by ID
//     const post = await Post.findByIdAndDelete(id);

//     // If the post is not found, throw an error
//     if (!post) throw new Error('Post not found');

//     // Responding with a success message
//     res.json({ message: 'Post deleted successfully' });
//   } catch (error) {
//     // Catching any error and responding with a 400 status code and error message
//     res.status(400).json({ error: error.message });
//   }
// };

// // Exporting the router to be used in routes
// module.exports = router;


//////////////////////////////////



// Importing the Post model to interact with the Post collection in MongoDB
const Post = require('../models/postModel');

// Controller function to create a new post
const createPost = async (req, res) => {
  const { title, content } = req.body; // Destructuring the title and content from the request body

  try {
    // Creating a new post with the provided title, content, and the user ID from the authenticated user
    const post = new Post({ title, content, user: req.user.id });

    // Saving the post to the database
    await post.save();

    // Responding with a 201 status code and the created post
    res.status(201).json(post);
  } catch (error) {
    // Catching any error and responding with a 400 status code and error message
    res.status(400).json({ error: error.message });
  }
};

// Controller function to fetch all posts
const getPosts = async (req, res) => {
  try {
    // Fetching all posts from the database, sorting them, and populating the 'user' field with user data (name and email)
    const posts = await Post.find()
      .populate('user', 'name email') // Populate user data
      .sort({ createdAt: -1 }); // Sort posts in descending order by createdAt

    // Responding with the fetched posts
    res.json(posts);
  } catch (error) {
    // Catching any error and responding with a 500 status code and error message
    res.status(500).json({ error: error.message });
  }
};

// Controller function to update an existing post
const updatePost = async (req, res) => {
  const { id } = req.params; // Extracting the post ID from the request parameters
  const { title, content } = req.body; // Destructuring the title and content from the request body

  try {
    // Finding and updating the post by ID, returning the updated post
    const post = await Post.findByIdAndUpdate(id, { title, content }, { new: true });

    // If the post is not found, throw an error
    if (!post) throw new Error('Post not found');

    // Responding with the updated post
    res.json(post);
  } catch (error) {
    // Catching any error and responding with a 400 status code and error message
    res.status(400).json({ error: error.message });
  }
};

// Controller function to delete a post
const deletePost = async (req, res) => {
  const { id } = req.params; // Extracting the post ID from the request parameters

  try {
    // Finding and deleting the post by ID
    const post = await Post.findByIdAndDelete(id);

    // If the post is not found, throw an error
    if (!post) throw new Error('Post not found');

    // Responding with a success message
    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    // Catching any error and responding with a 400 status code and error message
    res.status(400).json({ error: error.message });
  }
};

// Exporting the controller functions to be used in routes
module.exports = { createPost, getPosts, updatePost, deletePost };
