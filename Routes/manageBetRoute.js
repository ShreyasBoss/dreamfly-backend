// Routes/manageBetRoutes.js
const express = require('express');
const router = express.Router();
const manageBetController = require('../Controller/manageBetController');

// Create a new ManageBet
router.post('/', manageBetController.createManageBet);

// Get all ManageBets
router.get('/', manageBetController.getAllManageBets);

// Get a ManageBet by ID
router.get('/:id', manageBetController.getManageBetById);

// Update a ManageBet
router.put('/:id', manageBetController.updateManageBet);

// Delete a ManageBet
router.delete('/:id', manageBetController.deleteManageBet);

module.exports = router;
