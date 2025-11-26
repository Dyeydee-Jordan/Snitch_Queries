const express = require('express');
const router = express.Router();
const admissionController = require('../controllers/admissionRequestController');

// POST /api/admission/submit Parent submits admission request
router.post('/submit', admissionController.submitRequest); // Normal BMI requests will not go through

// GET /api/admission/requests Nutritionist views all pending requests
router.get('/requests', admissionController.viewRequests);

// PUT /api/admission/accept/:request_id Nutritionist accepts a request
router.put('/accept/:request_id', admissionController.acceptRequest);

// PUT /api/admission/decilne/:request_id Nutritionist declines a request
router.put('/decline/:request_id', admissionController.declineRequest);

// GET /api/admission/status/:request_id Parent checks status of a request
router.get('/status/:request_id', admissionController.getRequestStatus);

module.exports = router;