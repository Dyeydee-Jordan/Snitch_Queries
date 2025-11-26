const express = require('express');
const router = express.Router();
const parentController = require('../controllers/parentController');

// GET /api/parent/child/:id - get child details
router.get('/child/:id', parentController.viewChild);

// GET /api/parent/growth/:id - view child growth
router.get('/growth/:id', parentController.viewGrowthProgress);

module.exports = router;