const db = require('../database');

const AdmissionRequest = {

  // Parent submits a request
createRequest: (requestData) => {
  return new Promise((resolve, reject) => {
    const { firstname, middlename, lastname, age, gender, address, height, weight, phoneNumber, email } = requestData;

    // VALIDATION: Check required fields
    if (!firstname || !middlename || !lastname || !age || !gender || !address || !height || !weight || !phoneNumber || !email) {
      return reject(new Error('All fields are required'));
    }

    // BMI VALIDATION
    const heightMeters = height / 100;
    const bmi = weight / (heightMeters * heightMeters);

    if (bmi >= 18.5) {
      return reject(new Error('Request denied. BMI is Normal — Admission request is only for underweight children.'));
    }

    // INSERT request into DB (only if underweight)
    db.query(
      `INSERT INTO tbl_admissionrequests 
      (firstname, middlename, lastname, age, gender, address, height, weight, phoneNumber, email, status) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [firstname, middlename, lastname, age, gender, address, height, weight, phoneNumber, email, 'pending'],
      (err, results) => {
        if (err) return reject(err);

        resolve({
          request_id: results.insertId,
          ...requestData,
          status: 'pending'
        });
      }
    );
  });
},

  // Nutritionist views all pending requests
  getAllRequests: () => {
    return new Promise((resolve, reject) => {
      db.query(
        'SELECT * FROM tbl_admissionrequests WHERE status = "pending"',
        (err, results) => {
          if (err) return reject(err);
          resolve(results);
        }
      );
    });
  },

  // Nutritionist accepts a request
  acceptRequest: (request_id) => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM tbl_admissionrequests WHERE request_id = ?', [request_id], (err, results) => {
        if (err) return reject(err);

        if (!results || results.length === 0) return reject(new Error('Request not found'));

        const request = results[0];

        // Make sure no field is null
        const { firstname, middlename, lastname, age, gender, address, height, weight, phoneNumber, email } = request;
        if (!firstname || !middlename || !lastname || !age || !gender || !address || !height || !weight || !phoneNumber || !email) {
          return reject(new Error('Request data is incomplete'));
        }

        // Insert into tbl_members
        db.query(
          'INSERT INTO tbl_members (firstname, middlename, lastname, age, gender, address, height, weight, phoneNumber, email) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
          [firstname, middlename, lastname, age, gender, address, height, weight, phoneNumber, email],
          (err2, results2) => {
            if (err2) return reject(err2);

            // Update request status
            db.query('UPDATE tbl_admissionrequests SET status = "accepted" WHERE request_id = ?', [request_id], (err3) => {
              if (err3) return reject(err3);
              resolve({ member_id: results2.insertId, ...request, status: 'accepted' });
            });
          }
        );
      });
    });
  },

  // Nutritionist declines a request
  declineRequest: (request_id) => {
    return new Promise((resolve, reject) => {
      db.query('UPDATE tbl_admissionrequests SET status = "declined" WHERE request_id = ?', [request_id], (err, results) => {
        if (err) return reject(err);
        resolve({ request_id, status: 'declined' });
      });
    });
  },

  // Parent checks request status
  getRequestStatus: (request_id) => {
    return new Promise((resolve, reject) => {
      db.query(
        'SELECT request_id, firstname, middlename, lastname, status FROM tbl_admissionrequests WHERE request_id = ?',
        [request_id],
        (err, results) => {
          if (err) return reject(err);

          if (!results || results.length === 0) {
            return reject(new Error("Request not found"));
          }

          resolve(results[0]);
        }
      );
    });
  }

};

module.exports = AdmissionRequest;