const mongoose = require('mongoose');

const mealSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  calories: { type: Number, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Meal', mealSchema); 