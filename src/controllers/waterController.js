const Water = require('../models/Water');

exports.getAllWater = async (req, res) => {
  try {
    const water = await Water.find();
    res.json(water);
  } catch (err) {
    res.status(500).json({ message: 'Su kayıtları alınamadı', error: err.message });
  }
};

exports.createWater = async (req, res) => {
  try {
    const { user, amount } = req.body;
    const newWater = new Water({ user, amount });
    await newWater.save();
    res.status(201).json({ message: 'Su kaydı eklendi', water: newWater });
  } catch (err) {
    res.status(500).json({ message: 'Su kaydı eklenemedi', error: err.message });
  }
}; 