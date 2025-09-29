console.log('users.services.js called');
const User = require('../model/users.model');

// Function to create a new user
async function createUser(userData) {
  try {
    const newUser = await User.create(userData);
    return newUser;
  } catch (error) {
    throw new Error(`Error creating user: ${error.message}`);
  }
}

// Function to find a user by their username
async function findUserByUsername(username) {
  try {
    const user = await User.findOne({ username });
    return user;
  } catch (error) {
    throw new Error(`Error finding user by username: ${error.message}`);
  }
}
async function findUserByQuery(query) {
  try {
    const user = await User.findOne(query);
    return user;
  } catch (error) {
    throw new Error(`Error finding user by query: ${error.message}`);
  }
}

// Function to find a user by their email
async function findUserByEmail(email) {
  try {
    const user = await User.findOne({ email });
    return user;
  } catch (error) {
    throw new Error(`Error finding user by email: ${error.message}`);
  }
}

// Add other user-related functions (update, delete, find by ID, etc.) as needed

module.exports = {
  createUser,
  findUserByUsername,
  findUserByEmail,
  findUserByQuery
  // Add other exported functions here
};
