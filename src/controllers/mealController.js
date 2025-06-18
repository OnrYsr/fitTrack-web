const Meal = require('../models/Meal');

exports.getAllMeals = async (req, res) => {
  try {
    const meals = await Meal.find();
    res.json(meals);
  } catch (err) {
    res.status(500).json({ message: 'Öğünler alınamadı', error: err.message });
  }
};

exports.createMeal = async (req, res) => {
  try {
    const { user, name, calories } = req.body;
    const newMeal = new Meal({ user, name, calories });
    await newMeal.save();
    res.status(201).json({ message: 'Öğün eklendi', meal: newMeal });
  } catch (err) {
    res.status(500).json({ message: 'Öğün eklenemedi', error: err.message });
  }
}; 