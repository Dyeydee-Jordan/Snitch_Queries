const Department = require('../models/departmentModel');

const departmentController = {
  // Get all department
  getAllDepartment: async (req, res) => {
    try {
      const departments = await Department.getAll();
      res.json({
        success: true,
        data: departments
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error fetching department',
        error: error.message
      });
    }
  }
};

module.exports = departmentController;