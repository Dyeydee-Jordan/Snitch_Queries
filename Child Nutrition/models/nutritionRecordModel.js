const db = require('../database');

const NutritionRecord = {
    getById: (id) => {
        return new Promise((resolve, reject) => {
            const sql = `
                SELECT
                    id, 
                    firstname,
                    middlename,
                    lastname,
                    height,
                    weight
                FROM tbl_members
                WHERE id = ?
            `;

            db.query(sql, [id], (err, results) => {
                if (err) return reject(err);
                resolve(results); // keep original behavior (returns array)
            });
        });
    }
};

module.exports = NutritionRecord;
