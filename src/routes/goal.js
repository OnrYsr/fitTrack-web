const express = require('express');
const router = express.Router();
const goalController = require('../controllers/goalController');

router.get('/goals', goalController.getAllGoals);
router.post('/goals', goalController.createGoal);

module.exports = router; 