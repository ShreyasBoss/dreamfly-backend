const Bet = require('../Models/Bet'); // Assuming your model is in models/Bet.js
const upload = require('../helpers/upload'); // Your upload middleware
const fs = require('fs');
const path = require('path');

// Create a new Bet
exports.createBet = (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ message: err });
    }

    try {
      const newBet = new Bet({
        ...req.body,
        image: req.file ? req.file.path : null, // Store the image path if file is uploaded
      });
      const savedBet = await newBet.save();
      res.status(201).json(savedBet);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
};

// Get all Bets
exports.getAllBets = async (req, res) => {
  try {
    const bets = await Bet.find();
    res.status(200).json(bets);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a single Bet by ID
exports.getBetById = async (req, res) => {
  try {
    const bet = await Bet.findById(req.params.id);
    if (!bet) return res.status(404).json({ message: 'Bet not found' });
    res.status(200).json(bet);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update a Bet
exports.updateBet = (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ message: err });
    }

    try {
      const bet = await Bet.findById(req.params.id);
      if (!bet) return res.status(404).json({ message: 'Bet not found' });

      // Update the bet fields
      bet.name = req.body.name || bet.name;
      bet.amount = req.body.amount || bet.amount; // Assuming there's an amount field
      // Add other fields as necessary

      // Handle image upload
      if (req.file) {
        if (bet.image) {
          fs.unlinkSync(path.resolve(bet.image)); // Delete old image if it exists
        }
        bet.image = req.file.path;
      }

      const updatedBet = await bet.save();
      res.status(200).json(updatedBet);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
};

// Delete a Bet
exports.deleteBet = async (req, res) => {
  try {
    const deletedBet = await Bet.findByIdAndDelete(req.params.id);
    if (!deletedBet) return res.status(404).json({ message: 'Bet not found' });

    // Delete the associated image file if it exists
    if (deletedBet.image) {
      fs.unlinkSync(path.resolve(deletedBet.image)); // Delete image file
    }

    res.status(200).json({ message: 'Bet deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
