console.log('users.controller.js called');
const userService = require('../services/users.services');
const bcrypt = require('bcrypt');
const Joi = require('joi');

// Validation schemas
const registerSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required()
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
});

// Check server health
async function checkServer(req, res) {
  try {
    res.status(200).json({ message: 'Server is running properly' });
  } catch (error) {
    console.error('Server check error:', error);
    res.status(500).json({ message: 'Server error' });
  }
}
// Controller function to handle user registration
async function registerUser(req, res) {
  try {
    // Validate input
    const { error, value } = registerSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ 
        message: 'Validation error', 
        details: error.details.map(detail => detail.message) 
      });
    }

    const { username, email, password } = value;

    // Check if the username or email already exists
    const existingUsername = await userService.findUserByUsername(username);
    const existingEmail = await userService.findUserByEmail(email);

    if (existingUsername) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    if (existingEmail) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    // Create a new user
    const newUser = await userService.createUser({ username, email, password });
    
    // Remove password from response
    const userResponse = {
      _id: newUser._id,
      username: newUser.username,
      email: newUser.email,
      createdAt: newUser.createdAt
    };
    
    res.status(201).json({ message: 'User created successfully', user: userResponse });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Error creating user' });
  }
}

// Login API
async function login(req, res) {
  try {
    // Validate input
    const { error, value } = loginSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ 
        message: 'Validation error', 
        details: error.details.map(detail => detail.message) 
      });
    }

    const { email, password } = value;
    
    const user = await userService.findUserByEmail(email);
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (passwordMatch) {
      // Remove password from response
      const userResponse = {
        _id: user._id,
        username: user.username,
        email: user.email,
        createdAt: user.createdAt
      };
      
      return res.status(200).json({ 
        message: 'Login successful',
        user: userResponse
      });
    } else {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Error logging in' });
  }
}



// Other controller functions for login, profile updates, deletions, etc.

module.exports = {
  registerUser,
  checkServer,
  login,
  // Add other controller functions here
};
