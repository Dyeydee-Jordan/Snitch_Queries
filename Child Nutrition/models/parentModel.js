const db = require('../database');

const Parent = {
    getChildDetails: (id) => {
        return new Promise((resolve, reject) => {
            const query = `
                SELECT 
                    id,
                    CONCAT(firstname, ' ', middlename, ' ', lastname) AS fullName,
                    age,
                    gender,
                    address,
                    phoneNumber,
                    email
                FROM tbl_members
                WHERE id = ?
            `;

            db.query(query, [id], (err, results) => {
                if (err) return reject(err);
                resolve(results[0]); // return the first row
            });
        });
    },

    getChildGrowth: (id) => {
        return new Promise((resolve, reject) => {
            const query = `
                SELECT 
                    firstname,
                    middlename,
                    lastname,
                    height,
                    weight
                FROM tbl_members
                WHERE id = ?
            `;

            db.query(query, [id], (err, results) => {
                if (err) return reject(err);

                const child = results[0];
                if (!child) return resolve(null);

                // Calculate BMI
                const heightMeters = child.height / 100;
                const bmi = child.weight / (heightMeters * heightMeters);

                const bmiStatus = bmi < 18.5 ? "Underweight" : "Normal";

                resolve({
                    firstname: child.firstname,
                    middlename: child.middlename,
                    lastname: child.lastname,
                    height: child.height,
                    weight: child.weight,
                    bmi: parseFloat(bmi.toFixed(2)),
                    bmiStatus
                });
            });
        });
    },

    


};

module.exports = Parent;