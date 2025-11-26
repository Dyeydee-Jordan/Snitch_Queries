const Parent = require('../models/parentModel');

    const parentController = {
        viewChild: async (req, res) => {
        try {
            const { id } = req.params;

            const child = await Parent.getChildDetails(id);

            if (!child) {
                return res.status(404).json({
                    success: false,
                    message: "Child not found"
                });
            }

            return res.json({
                success: true,
                data: child
            });

        } catch (error) {
            return res.status(500).json({
                success: false,
                message: "Error fetching child details",
                error: error.message
            });
        }
    },

    viewGrowthProgress: async (req, res) => {
        try {
            const { id } = req.params;

            const growth = await Parent.getChildGrowth(id);

            if (!growth) {
                return res.status(404).json({
                    success: false,
                    message: "Child not found"
                });
            }

            return res.json({
                success: true,
                data: growth
            });

        } catch (error) {
            return res.status(500).json({
                success: false,
                message: "Error fetching growth progress",
                error: error.message
            });
        }
    },

    
    

}
module.exports = parentController;