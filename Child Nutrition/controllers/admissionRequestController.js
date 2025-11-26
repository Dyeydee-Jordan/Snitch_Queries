const AdmissionRequest = require('../models/admissionRequestModel');

const admissionController = {

  // Parent submits request
  submitRequest: async (req, res) => {
    try {
      const newRequest = await AdmissionRequest.createRequest(req.body);
      res.status(201).json({
        success: true,
        message: 'Admission request submitted successfully',
        data: newRequest
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: 'Error submitting request',
        error: error.message
      });
    }
  },

  // Nutritionist views all pending requests
  viewRequests: async (req, res) => {
    try {
      const requests = await AdmissionRequest.getAllRequests();
      res.status(200).json({
        success: true,
        total: requests.length,
        requests
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error fetching requests',
        error: error.message
      });
    }
  },

  // Accept a request
  acceptRequest: async (req, res) => {
    try {
      const { request_id } = req.params;
      const accepted = await AdmissionRequest.acceptRequest(request_id);
      res.status(200).json({
        success: true,
        message: 'Request accepted and member added successfully',
        data: accepted
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: 'Error accepting request',
        error: error.message
      });
    }
  },

  // Decline a request
  declineRequest: async (req, res) => {
    try {
      const { request_id } = req.params;
      const declined = await AdmissionRequest.declineRequest(request_id);
      res.status(200).json({
        success: true,
        message: 'Request declined',
        data: declined
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: 'Error declining request',
        error: error.message
      });
    }
  },

  // Parent checks a request status
  getRequestStatus: async (req, res) => {
    try {
      const { request_id } = req.params;

      const status = await AdmissionRequest.getRequestStatus(request_id);

      res.status(200).json({
        success: true,
        message: "Request status retrieved successfully",
        data: status
      });

    } catch (error) {
      res.status(400).json({
        success: false,
        message: "Error fetching request status",
        error: error.message
      });
    }
  }

};

module.exports = admissionController;