console.log('users.router.js called');
const express = require('express');
const router = express.Router();
const userController = require('../controller/users.controller'); // Assuming your user controller file is named users.controller.js

// POST route for user registration
router.get('/check',  userController.checkServer);
router.post('/register', userController.registerUser);
// Add other routes for login, profile updates, deletions, etc.
// Example:
router.post('/login', userController.login);
// router.put('/updateProfile', userController.updateProfile);
// router.delete('/deleteUser', userController.deleteUser);

module.exports = router;
