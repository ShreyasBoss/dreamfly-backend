const express = require('express');
const router = express.Router();
const betController = require('../Controller/betController'); // Assuming betController is in controllers folder

// Create a new Bet
router.post('/', betController.createBet);

// Get all Bets
router.get('/', betController.getAllBets);

// Get a single Bet by ID
router.get('/:id', betController.getBetById);

// Update a Bet by ID
router.put('/:id', betController.updateBet);

// Delete a Bet by ID
router.delete('/:id', betController.deleteBet);

module.exports = router;
