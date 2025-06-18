const mongoose = require('mongoose');

const goalSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  calories: { type: Number, required: true },
  water: { type: Number, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Goal', goalSchema); 