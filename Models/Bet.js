const mongoose = require('mongoose');

const betSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  image: { type: String }, // to store the image path
  startDate:Date,
  endDate:Date,
  totalUsers:String,
}, {
  timestamps: true, // Automatically add createdAt and updatedAt fields
});

const Bet = mongoose.model('Bet', betSchema);

module.exports = Bet;
