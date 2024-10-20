// Models/ManageBet.js
const mongoose = require('mongoose');

const manageBetSchema = new mongoose.Schema({
  betId: { type: mongoose.Schema.Types.ObjectId, ref: 'Bet', required: true },
  userIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true }],
  amount: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}, {
  timestamps: true,
});

const ManageBet = mongoose.model('ManageBet', manageBetSchema);

module.exports = ManageBet;
