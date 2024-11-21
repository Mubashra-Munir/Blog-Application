// Importing necessary dependencies
const express = require('express'); // Express.js framework for building the server
const dotenv = require('dotenv'); // To load environment variables from .env file
const connectDB = require('./config/db'); // Function to connect to the MongoDB database
const cors = require('cors'); 
const userRoutes = require('./routes/userRoutes'); // Importing user-related routes
const postRoutes = require('./routes/postRoutes'); // Importing post-related routes
const multer = require('multer')
const path = require('path');
const router = require('./routes/userRoutes');



// Configure environment variables from the .env file
dotenv.config();

// Establishing a connection to the MongoDB database
connectDB();

// Initialize the Express app
const app = express();

// Middleware for handling Cross-Origin Resource Sharing (CORS)

app.use(express.json()); // Middleware to parse incoming JSON requests
app.use(cors()); // Enabling CORS for handling requests from different origins

const storage=multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null,'../src/images/')
    },
     filename: (req,file,cb)=>{
        cb(null,file,fieldname +"_" + Date.now()+ path.extname(file.originalname))
     }
    
})
const upload=multer({
    storage:storage
})

app.post('/uploads', upload.single("image"),(req,res)=>{
    console.log(req.body);
  userModel.create({image: req.file.filename})
  .then(result=>res.json(result))
  .catch(err=>console.log(err))
})

app.use(router)
// Defining route handlers for different API endpoints
app.use('/api/users', userRoutes); // User routes: handling user-related API calls
app.use('/api/posts', postRoutes); // Post routes: handling post-related API calls




// Starting the Express server on port 5000 and logging the message when the server is up
app.listen(5000, () => console.log('Server running on port 5000'));


