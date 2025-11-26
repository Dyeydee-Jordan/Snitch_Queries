const Nutrition = require('../models/nutritionistModel');

const nutritionistController = {

// Get all members
  getAllMembers: async (req, res) => {
    try {
      const members = await Nutrition.getAll();
      res.json({
        success: true,
        data: members
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error fetching members',
        error: error.message
      });
    }
  },

// Get member by ID
  getMemberById: async (req, res) => {
    try {
      const member = await Nutrition.getById(req.params.id);
      if (!member) {
        return res.status(404).json({
          success: false,
          message: 'Member not found'
        });
      }
      res.json({
        success: true,
        data: member
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error fetching member',
        error: error.message
      });
    }
  },

  // GET member full name and BMI status by ID
  getMemberStatusById: async (req, res) => {
  try {
    const memberId = req.params.id;

    const member = await Nutrition.getMemberStatusById(memberId);

    if (!member) {
      return res.status(404).json({
        success: false,
        message: 'Member not found'
      });
    }

    res.status(200).json({
      success: true,
      member: member
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error retrieving member',
      error: error.message
    });
  }
},



// Controller for retrieving all members with BMI distinction
getAllMembersWithBMI: async (req, res) => {
  try {
    const members = await Nutrition.getAllMembersBMI();

    res.status(200).json({
      success: true,
      total: members.length,
      members: members
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching members with BMI status',
      error: error.message
    });
  }
},

 // Create new child record
  createMember: async (req, res) => {
    try {
      const { firstname, middlename, lastname, age, gender, address, height, weight, phoneNumber, email } = req.body;

      // Validation
      if (!firstname || !middlename || !lastname || !age || !gender || !address || !height || !weight || !phoneNumber || !email) {
        return res.status(400).json({
          success: false,
          message: 'All fields (firstname, middlename, lastname, age, gender, address, height, weight, phoneNumber, email) are required'
        });
      }

      // BMI VALIDATION
      const bmi = weight / ((height / 100) * (height / 100));
      const normalBMI = 18.5;
      if (bmi >= normalBMI) {
        return res.status(400).json({
          success: false,
          message: 'Member is in normal BMI range and will not be added to the system'
        });
      }

      const newMember = await Nutrition.create({
        firstname,
        middlename,
        lastname,
        age,
        gender,
        address,
        height,
        weight,
        phoneNumber,
        email
      });

      res.status(201).json({
        success: true,
        message: 'Member created successfully',
        data: newMember
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error creating member',
        error: error.message
      });
    }
  },

  // Update member
    updateMember: async (req, res) => {
      try {
        const { firstname, middlename, lastname, age, gender, address, height, weight, phoneNumber, email } = req.body;
        const memberId = req.params.id;
  
        // Check if student exists
        const existingMember = await Nutrition.getById(memberId);
        if (!existingMember) {
          return res.status(404).json({
            success: false,
            message: 'Member not found'
          });
        }
  
        // Validation
        if (!firstname || !middlename || !lastname || !age || !gender || !address || !height || !weight || !phoneNumber || !email) {
          return res.status(400).json({
            success: false,
            message: 'All fields (firstname, middlename, lastname, age, gender, address, height, weight, phoneNumber, email) are required'
          });
        }
  
        await Nutrition.update(memberId, {
          firstname,
        middlename,
        lastname,
        age,
        gender,
        address,
        height,
        weight,
        phoneNumber,
        email
        });
  
        res.json({
          success: true,
          message: 'Member updated successfully'
        });
      } catch (error) {
        res.status(500).json({
          success: false,
          message: 'Error updating member',
          error: error.message
        });
      }
    },

    // Delete student
    deleteMember: async (req, res) => {
        try {
          const memberId = req.params.id;
    
          // Check if member exists
          const existingMember = await Nutrition.getById(memberId);
          if (!existingMember) {
            return res.status(404).json({
              success: false,
              message: 'Student not found'
            });
          }
    
          await Nutrition.delete(memberId);
    
          res.json({
            success: true,
            message: 'Member deleted successfully'
          });
        } catch (error) {
          res.status(500).json({
            success: false,
            message: 'Error deleting member',
            error: error.message
          });
        }
      },

    

}
module.exports = nutritionistController;
