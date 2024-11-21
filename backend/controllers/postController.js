
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

// // Controller function to fetch all posts
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

// // Exporting the controller functions to be used in routes
// module.exports = { createPost, getPosts, updatePost, deletePost };

////////////////////////////////////////

const Post = require('../models/postModel');
const multer = require('multer');
const path = require('path');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Directory to store uploaded files
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Unique filename
  },
});
const upload = multer({ 
  storage, 
  fileFilter: (req, file, cb) => {
    // Validate file type (e.g., only images)
    const fileTypes = /jpeg|jpg|png|gif/;
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = fileTypes.test(file.mimetype);

    if (extname && mimetype) {
      cb(null, true);
    } else {
      cb(new Error('Images only!'));
    }
  },
});

// Controller function to create a new post
const createPost = async (req, res) => {
  console.log("Request body:", req.body);  // Log the body to ensure title and content are there
  console.log("Uploaded file:", req.file);
  const { title, content } = req.body; // Destructuring title and content
  const image = req.file ? req.file.path : null; // Image file path

  // try {
  //   const post = new Post({
  //     title,
  //     content,
  //     image, // Save the image path
  //     user: req.user.id, // User ID from authentication
  //   });


    try {
      const post = new Post({
        
        title,
        content,
        user: req.user.id,
        // image: req.file.path, 
        image: req.file ? req.file.path : null,
        
        // image: `uploads/${req.file.filename}`, // Ensure this path is accessible
      });
    await post.save();
    res.status(201).json(post);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Controller function to update an existing post
const updatePost = async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  const image = req.file ? req.file.path : null; // Image file path

  try {
    const updateFields = { title, content };
    if (image) updateFields.image = image; // Only update image if provided

    const post = await Post.findByIdAndUpdate(id, updateFields, { new: true });

    if (!post) throw new Error('Post not found');

    res.json(post);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Controller function to fetch all posts
const getPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate('user', 'name email')
      .sort({ createdAt: -1 });

    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller function to delete a post
const deletePost = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await Post.findByIdAndDelete(id);

    if (!post) throw new Error('Post not found');

    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Exporting the controller functions and multer upload middleware
module.exports = {
  createPost,
  getPosts,
  updatePost,
  deletePost,
  upload, // Exporting multer middleware for routes
};

//////////////////////////////
