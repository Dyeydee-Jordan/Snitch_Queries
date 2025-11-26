const NutritionRecord = require('../models/nutritionRecordModel');

const nutritionController = {

  // Get nutrition record by ID
  getNutritionRecordById: async (req, res) => {
    try {
      const { id } = req.params;

      const results = await NutritionRecord.getById(id);

      if (!results || results.length === 0) {
        return res.status(404).json({
          success: false,
          message: "Member not found"
        });
      }

      const row = results[0];

      const heightMeters = row.height / 100;
      const bmi = parseFloat((row.weight / (heightMeters * heightMeters)).toFixed(2));

      let status = "";
      let remarks = "";

      if (bmi < 18.5) {
        status = "Underweight";
        remarks = "Member needs to continue the program";
      } else {
        status = "Normal";
        remarks = "Member can now be removed from the program";
      }

      res.status(200).json({
        success: true,
        data: {
          id: row.id,
          firstname: row.firstname,
          middlename: row.middlename,
          lastname: row.lastname,
          height: row.height,
          weight: row.weight,
          bmi,
          status,
          remarks
        }
      });

    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Database error fetching nutrition record",
        error: error.message
      });
    }
  }

};

module.exports = nutritionController;
