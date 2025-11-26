const express = require('express');
const router = express.Router();
const nutritionRecordController = require('../controllers/nutritionRecordController');

// GET /api/nutrition/records/:id nutrition record by ID
router.get('/records/:id', nutritionRecordController.getNutritionRecordById);

module.exports = router;
