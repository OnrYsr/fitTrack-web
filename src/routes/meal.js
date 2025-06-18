const express = require('express');
const router = express.Router();
const mealController = require('../controllers/mealController');

router.get('/meals', mealController.getAllMeals);
router.post('/meals', mealController.createMeal);

module.exports = router; 