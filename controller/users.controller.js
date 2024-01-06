console.log('users.controller.js called');  
const { escape } = require('querystring');
  const userService = require('../services/usres.services');
  const bycrpt = require('bcrypt');

  // check the server;
  async function checkServer(req, res){
    try {
      res.send({message: 'Server is running properly'})
    } catch (error) {
      console.log(`this is your error ${error}`)
      
    }
  }
// Controller function to handle user registration
async function registerUser(req, res) {
  const { username, email, password } = req.body;

  try {
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
    res.status(201).json({ message: 'User created successfully', user: newUser });
  } catch (error) {
    res.status(500).json({ message: `Error creating user: ${error.message}` });
  }
}

// login api;
async function login(req, res){
   const {email, password} = req.body;
   try {
    const user  = await userService.findUserByEmail(email);
    if(!user){
      return res.status(404).json({message: "User not found"});
    }
    const passwordMatch = await bycrpt.compare(password , user.password);
    if(passwordMatch){
      return res.status(200).json({message: 'Login successful'});
    }else{
      return res.status(404).json({message: 'Invalid credentials'});
    }
   } catch (error) {
    res.status(500).json({ message: `Error logging in: ${error.message}` });
   }
}



// Other controller functions for login, profile updates, deletions, etc.

module.exports = {
  registerUser,
  checkServer,
  login,
  // Add other controller functions here
};
