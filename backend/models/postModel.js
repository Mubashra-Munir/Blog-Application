// Importing mongoose to interact with MongoDB
const mongoose = require('mongoose');

// Defining the schema for the Post model
const postSchema = new mongoose.Schema({

  // Defining the 'title' field with String type and making it required
  title: { type: String, required: true },

  // Defining the 'content' field with String type and making it required
  content: { type: String, required: true },

  // image: { type: String, required: true }, // Store image pathn

  // Defining the 'user' field, referencing the 'User' model by ObjectId
  // This establishes a relationship between the Post and User models
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },

 

}, { 
  // Enabling timestamps to automatically add createdAt and updatedAt fields
  timestamps: true 
});

// Exporting the Post model, using the defined schema
module.exports = mongoose.model('Post', postSchema);


/////////////////////////////

// // Importing mongoose to interact with MongoDB
// const mongoose = require('mongoose');

// // Defining the schema for the Post model
// const postSchema = new mongoose.Schema({

//   // Defining the 'title' field with String type and making it required
//   title: { type: String, required: true },

//   // Defining the 'content' field with String type and making it required
//   content: { type: String, required: true },

//   // Defining the 'image' field, where we store the image path
//   image: { type: String, required: false }, // Store image path

//   // Defining the 'user' field, referencing the 'User' model by ObjectId
//   // This establishes a relationship between the Post and User models
//   user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },

// }, { 
//   // Enabling timestamps to automatically add createdAt and updatedAt fields
//   timestamps: true 
// });

// // Exporting the Post model, using the defined schema
// module.exports = mongoose.model('Post', postSchema);
