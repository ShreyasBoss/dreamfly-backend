const Bet = require('../Models/Bet'); // Assuming your model is in models/bet.js

// Create a new Bet
exports.createBet = async (req, res) => {
  try {
    const newBet = new Bet(req.body);
    const savedBet = await newBet.save();
    res.status(201).json(savedBet);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
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
exports.updateBet = async (req, res) => {
  try {
    const updatedBet = await Bet.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updatedBet) return res.status(404).json({ message: 'Bet not found' });
    res.status(200).json(updatedBet);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete a Bet
exports.deleteBet = async (req, res) => {
  try {
    const deletedBet = await Bet.findByIdAndDelete(req.params.id);
    if (!deletedBet) return res.status(404).json({ message: 'Bet not found' });
    res.status(200).json({ message: 'Bet deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
