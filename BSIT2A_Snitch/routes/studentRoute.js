const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');

// GET /api/students - Get all students
router.get('/', studentController.getAllStudents);

// GET /api/students/status/:status - Get students by status
router.get('/status/:status', studentController.getStudentsByStatus);

// GET /api/students/:id - Get student by ID
router.get('/:id', studentController.getStudentById);

// // POST /api/students - Create new student
router.post('/', studentController.createStudent);

// // PUT /api/students/:id - Update student
router.put('/:id', studentController.updateStudent);

// // DELETE /api/students/:id - Delete student
router.delete('/:id', studentController.deleteStudent);

// GET /api/students/firstname/:firstname - Get students by firstname
router.get('/firstname/:firstname', studentController.getStudentsByFirstname);

// GET /api/students/course/:course - Get students by course
router.get('/course/:course', studentController.getStudentsByCourse);

module.exports = router;