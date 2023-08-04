const Database = require('../database');
const database = new Database();


async function insertCompany(user_id){
    const sql = `INSERT INTO "Company" (user_id)
                VALUES ($1)`;
    const binds = [user_id];
    await database.execute(sql, binds);
}


module.exports = {
    insertCompany
}