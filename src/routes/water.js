const express = require('express');
const router = express.Router();
const waterController = require('../controllers/waterController');

router.get('/water', waterController.getAllWater);
router.post('/water', waterController.createWater);

module.exports = router; 