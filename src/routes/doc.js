const express = require('express');
const router = express.Router();
const docController = require('../controllers/docController');

router.get('/docs', docController.getAllDocs);
router.post('/docs', docController.createDoc);
router.get('/docs/:type', docController.getDocsByType);

module.exports = router; 