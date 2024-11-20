// Importing mongoose to interact with MongoDB
const mongoose = require('mongoose');

// Defining the schema for the User model
const userSchema = new mongoose.Schema({
  // Defining the 'name' field with String type and making it required
  name: { type: String, required: true },

  // Defining the 'email' field with String type, making it required and ensuring it is unique
  email: { type: String, required: true, unique: true },

  // Defining the 'password' field with String type and making it required
  password: { type: String, required: true },
}, { 
  // Enabling timestamps to automatically add createdAt and updatedAt fields
  timestamps: true 
});

// Exporting the User model, using the defined schema
module.exports = mongoose.model('User', userSchema);

