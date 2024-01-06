console.log('uses.model.js called');
const mongoose = require('mongoose');
const bycrpt = require('bcrypt');

// Define the User Schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// here you can user the bycrpt for prtectect the password;
userSchema.pre('save', async function(next) {
  try {
    const salt = await bycrpt.genSalt(10);
    const hasPassword = await  bycrpt.hash(this.password, salt);
    this.password = hasPassword;
    next();
  } catch (error) {
    next(error)
    
  }
})

// Create a User model based on the schema
const User = mongoose.model('User', userSchema);

module.exports = User;
