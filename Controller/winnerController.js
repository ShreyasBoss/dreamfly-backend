const Winner = require('../Models/Winner'); // Assuming the model is in Models/winner.js
const Bet = require('../Models/Bet');
const User = require('../Models/User');

// Create a new Winner
exports.createWinner = async (req, res, io) => {
    try {
      const { betId, userId, prize } = req.body;
  
      // Ensure the Bet and User exist before creating the winner
      const bet = await Bet.findById(betId);
      if (!bet) return res.status(404).json({ message: 'Bet not found' });
  
      const user = await User.findById(userId);
      if (!user) return res.status(404).json({ message: 'User not found' });
  
      const newWinner = new Winner({ betId, userId, prize });
      const savedWinner = await newWinner.save();
  
      // Emit event to Socket.IO when winner is created
      io.emit('newWinner', savedWinner); // Send the savedWinner data to all connected clients
  
      res.status(201).json(savedWinner);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  };

// Get all Winners
exports.getAllWinners = async (req, res) => {
  try {
    const winners = await Winner.find().populate('betId').populate('userId'); // Populate related Bet and User data
    res.status(200).json(winners);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a Winner by ID
exports.getWinnerById = async (req, res) => {
  try {
    const winner = await Winner.findById(req.params.id).populate('betId').populate('userId');
    if (!winner) return res.status(404).json({ message: 'Winner not found' });
    res.status(200).json(winner);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update a Winner
exports.updateWinner = async (req, res) => {
  try {
    const { betId, userId, prize } = req.body;

    // Ensure the Bet and User exist before updating the winner
    const bet = await Bet.findById(betId);
    if (!bet) return res.status(404).json({ message: 'Bet not found' });

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const updatedWinner = await Winner.findByIdAndUpdate(
      req.params.id,
      { betId, userId, prize },
      { new: true, runValidators: true }
    ).populate('betId').populate('userId');

    if (!updatedWinner) return res.status(404).json({ message: 'Winner not found' });

    res.status(200).json(updatedWinner);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete a Winner
exports.deleteWinner = async (req, res) => {
  try {
    const deletedWinner = await Winner.findByIdAndDelete(req.params.id);
    if (!deletedWinner) return res.status(404).json({ message: 'Winner not found' });
    res.status(200).json({ message: 'Winner deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
