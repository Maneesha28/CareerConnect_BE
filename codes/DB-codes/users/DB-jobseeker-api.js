const Database = require('../database');
const database = new Database();


async function insertJobseeker(user_id){
    const sql = `INSERT INTO "Job_Seeker" (user_id)
                VALUES ($1)`;
    const binds = [user_id];
    await database.execute(sql, binds);
}

module.exports = {
    insertJobseeker
}