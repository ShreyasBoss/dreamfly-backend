// Routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../Controller/RegController');

// Create a new user
router.post('/', userController.createUser);

// Get all users
router.get('/', userController.getAllUsers);

// Get a user by ID
router.get('/:id', userController.getUserById);

// Update a user
router.put('/:id', userController.updateUser);

// Delete a user
router.delete('/:id', userController.deleteUser);

// Login a user
router.post('/login', userController.loginUser);

module.exports = router;
