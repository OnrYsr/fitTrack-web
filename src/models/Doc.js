const mongoose = require('mongoose');

const docSchema = new mongoose.Schema({
  type: { type: String, required: true },
  title: { type: String, required: true },
  content: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Doc', docSchema); 