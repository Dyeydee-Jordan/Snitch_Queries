const db = require('../database');

const Department = {
  // Get all department
  getAll: () => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM tbl_department', (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });
  }
};

module.exports = Department;