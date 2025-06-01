const mongoose = require('mongoose');

// Define a schema for the User model using mongoose
const userSchema = new mongoose.Schema({
name: { type: String, required: true },
gender: { type: String, required: true }
});


// Create a mongoose model named 'User' based on the defined schema
const User = mongoose.model('User', userSchema);


module.exports = User;