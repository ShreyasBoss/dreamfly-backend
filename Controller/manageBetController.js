// Controllers/manageBetController.js
const ManageBet = require('../Models/ManageBet');
const Bet = require('../Models/Bet'); // Assuming the Bet model is in Models/Bet.js
const User = require('../Models/User'); // Assuming the User model is in Models/User.js

// Create a new ManageBet
exports.createManageBet = async (req, res) => {
  try {
    const { betId, userIds, amount } = req.body;

    // Ensure the Bet exists
    const bet = await Bet.findById(betId);
    if (!bet) return res.status(404).json({ message: 'Bet not found' });

    // Create a new ManageBet entry
    const newManageBet = new ManageBet({ betId, userIds, amount });
    const savedManageBet = await newManageBet.save();
    
    res.status(201).json(savedManageBet);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get all ManageBets
exports.getAllManageBets = async (req, res) => {
  try {
    const manageBets = await ManageBet.find().populate('betId').populate('userIds');
    res.status(200).json(manageBets);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a ManageBet by ID
exports.getManageBetById = async (req, res) => {
  try {
    const manageBet = await ManageBet.findById(req.params.id).populate('betId').populate('userIds');
    if (!manageBet) return res.status(404).json({ message: 'ManageBet not found' });
    res.status(200).json(manageBet);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update a ManageBet
exports.updateManageBet = async (req, res) => {
  try {
    const { betId, userIds, amount } = req.body;

    // Ensure the Bet exists
    const bet = await Bet.findById(betId);
    if (!bet) return res.status(404).json({ message: 'Bet not found' });

    const updatedManageBet = await ManageBet.findByIdAndUpdate(
      req.params.id,
      { betId, userIds, amount },
      { new: true, runValidators: true }
    ).populate('betId').populate('userIds');

    if (!updatedManageBet) return res.status(404).json({ message: 'ManageBet not found' });

    res.status(200).json(updatedManageBet);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete a ManageBet
exports.deleteManageBet = async (req, res) => {
  try {
    const deletedManageBet = await ManageBet.findByIdAndDelete(req.params.id);
    if (!deletedManageBet) return res.status(404).json({ message: 'ManageBet not found' });
    res.status(200).json({ message: 'ManageBet deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
