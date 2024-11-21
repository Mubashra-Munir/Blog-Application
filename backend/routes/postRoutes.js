// Importing necessary dependencies
const express = require('express'); // Express.js framework for routing
const { createPost, getPosts, updatePost, deletePost } = require('../controllers/postController'); // Importing controller functions for handling post-related actions
const { authenticate } = require('../middleware/authMiddleware'); // Importing middleware for user authentication
const router = express.Router(); // Creating a new router instance to handle post-related routes
const upload = require('../config/upload'); // Make sure the upload middleware is correctly set up
// Defining the route for creating a new post
//router.post('/', authenticate, createPost); // POST request to /api/posts triggers createPost function, with authentication middleware
router.post('/', authenticate, upload.single('image'), createPost);
// Defining the route for fetching all posts 
router.get("/", getPosts); // GET request to /api/posts triggers getPosts function
// router.get('/:id', getPostById);

// Defining the route for updating a specific post
router.put('/:id', authenticate, updatePost); // PUT request to /api/posts/:id triggers updatePost function, with authentication middleware
// router.put('/:id', authenticate, upload.single('image'), updatePost);
// Defining the route for deleting a specific post
router.delete('/:id', authenticate, deletePost); // DELETE request to /api/posts/:id triggers deletePost function, with authentication middleware
module.exports = router;



////////////////////
// const express = require("express")
// const Router = express.Router();
// const { getAllBlogs , addBlog ,
//      updateBlog ,getById , 
//     deleteBlog , getByUserId} = require("../controller/blog-controller");

// Router.get("/",getAllBlogs);
// Router.post('/add', addBlog);
// Router.put("/update/:id",  updateBlog);
// Router.get("/:id", getById);
// Router.delete("/:id",deleteBlog);
// Router.get("/user/:id",getByUserId)
// module.exports = Router;


