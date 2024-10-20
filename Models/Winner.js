const mongoose = require('mongoose');

const winnerSchema = new mongoose.Schema({
  betId: { type: mongoose.Schema.Types.ObjectId, ref: 'Bet', required: true }, // Reference to Bet
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true }, // Reference to User
  wonAt: { type: Date, default: Date.now }, // Time of winning
}, {
  timestamps: true, // Automatically add createdAt and updatedAt fields
});

const Winner = mongoose.model('Winner', winnerSchema);

module.exports = Winner;
