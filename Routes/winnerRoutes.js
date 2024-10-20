const express = require('express');
const router = express.Router();
const winnerController = require('../Controller/winnerController');

// Create a new Winner
router.post('/', winnerController.createWinner);

// Get all Winners
router.get('/', winnerController.getAllWinners);

// Get a single Winner by ID
router.get('/:id', winnerController.getWinnerById);

// Update a Winner by ID
router.put('/:id', winnerController.updateWinner);

// Delete a Winner by ID
router.delete('/:id', winnerController.deleteWinner);

module.exports = router;
