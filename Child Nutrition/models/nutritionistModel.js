const db = require('../database');

const Nutrition = {

// Get all members
  getAll: () => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM tbl_members', (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });
  },

// Get member by ID
getById: (id) => {
  return new Promise((resolve, reject) => {
    db.query(
      'SELECT * FROM tbl_members WHERE id = ?',
      [id],
      (err, results) => {
        if (err) reject(err);
        resolve(results[0]);
      }
    );
  });
},

// Get member by ID with full name and BMI status
getMemberStatusById: (id) => {
  return new Promise((resolve, reject) => {
    db.query(
      'SELECT firstname, middlename, lastname, height, weight FROM tbl_members WHERE id = ?',
      [id],
      (err, results) => {
        if (err) return reject(err);

        const member = results[0];

        if (!member) {
          return resolve(null); // Member not found
        }

        // Calculate BMI
        const heightInMeters = member.height / 100;
        const bmi = member.weight / (heightInMeters * heightInMeters);

        // Determine BMI status
        const bmiStatus = bmi < 18.5 ? 'Underweight' : 'Normal';

        // Return only id, full name, and BMI status
        resolve({
          id: id,
          fullName: `${member.firstname} ${member.middlename} ${member.lastname}`,
          bmiStatus: bmiStatus
        });
      }
    );
  });
},

// Get member based on BMI
 getAllMembersBMI: () => {
  return new Promise((resolve, reject) => {
    db.query('SELECT id, firstname, middlename, lastname, height, weight FROM tbl_members', (err, results) => {
      if (err) return reject(err);

      const updatedResults = results.map(member => {
        const heightInMeters = member.height / 100;
        const bmi = member.weight / (heightInMeters * heightInMeters);
        const bmiStatus = bmi < 18.5 ? 'Underweight' : 'Normal';

        return {
          id: member.id,
          fullName: `${member.firstname} ${member.middlename} ${member.lastname}`,
          height: member.height,
          weight: member.weight,
          bmiStatus
        };
      });

      resolve(updatedResults);
    });
  });
},

    // Create new member
  create: (memberData) => {
    return new Promise((resolve, reject) => {
      const { firstname, middlename, lastname, age, gender, address, height, weight, phoneNumber, email } = memberData;
      db.query(
        'INSERT INTO tbl_members (firstname, middlename, lastname, age, gender, address, height, weight, phoneNumber, email) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [firstname, middlename, lastname, age, gender, address, height, weight, phoneNumber, email],
        (err, results) => {
          if (err) reject(err);
          resolve({ id: results.insertId, ...memberData});
        }
      );
    });
  },

  // Update member
  update: (id, memberData) => {
    return new Promise((resolve, reject) => {
      const { firstname, middlename, lastname, age, gender, address, height, weight, phoneNumber, email } = memberData;
      db.query(
        'UPDATE tbl_members SET firstname = ?, middlename = ?, lastname = ?, age = ?, gender = ?, address = ?, height = ?, weight = ?, phoneNumber = ?, email = ? WHERE id = ?',
        [firstname, middlename, lastname, age, gender, address, height, weight, phoneNumber, email, id],
        (err, results) => {
          if (err) reject(err);
          resolve(results);
        }
      );
    });
  },

  // Delete member
  delete: (id) => {
    return new Promise((resolve, reject) => {
      db.query('DELETE FROM tbl_members WHERE id = ?', [id], (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });
  },

  

}
module.exports = Nutrition;