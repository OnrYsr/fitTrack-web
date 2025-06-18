const Goal = require('../models/Goal');

exports.getAllGoals = async (req, res) => {
  try {
    const goals = await Goal.find();
    res.json(goals);
  } catch (err) {
    res.status(500).json({ message: 'Hedefler alınamadı', error: err.message });
  }
};

exports.createGoal = async (req, res) => {
  try {
    const { user, calories, water } = req.body;
    const newGoal = new Goal({ user, calories, water });
    await newGoal.save();
    res.status(201).json({ message: 'Hedef eklendi', goal: newGoal });
  } catch (err) {
    res.status(500).json({ message: 'Hedef eklenemedi', error: err.message });
  }
}; 