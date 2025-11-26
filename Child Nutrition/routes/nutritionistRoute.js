const express = require('express');
const router = express.Router();
const nutritionistController = require('../controllers/nutritionistController');

// GET /api/member/bmi - Get all members with id, fullName, height, weight, bmiStatus
router.get('/bmi', nutritionistController.getAllMembersWithBMI);

// GET /api/member/status/:id - Get member full name and BMI status
router.get('/status/:id', nutritionistController.getMemberStatusById);

// GET /api/member/:id - Get member by ID
router.get('/:id', nutritionistController.getMemberById);

// GET /api/member - Get all members (optional, if needed)
router.get('/', nutritionistController.getAllMembers);

// POST /api/member - Create new member
router.post('/', nutritionistController.createMember);

// PUT /api/member/:id - Update member
router.put('/:id', nutritionistController.updateMember);

// DELETE /api/member/:id - Delete member
router.delete('/:id', nutritionistController.deleteMember);



module.exports = router;