const Database = require('../database');
const database = new Database();


async function insertUser(email, role, password){
    const sql = `INSERT INTO "User" (email, role, password)
                VALUES ($1, $2, $3)`;
    const binds = [email, role, password];
    await database.execute(sql, binds);
}

async function getUserByEmail(email){
    const sql = `SELECT * FROM "User" WHERE email = $1`
    const binds = [email];
    const result = (await database.execute(sql, binds)).rows;
    return result[0];
}

async function getUserById(user_id){
    const sql = `SELECT * FROM "User" WHERE user_id = $1`
    const binds = [user_id];
    const result = (await database.execute(sql, binds)).rows;
    return result[0];
}

module.exports = {
    insertUser,
    getUserByEmail,
    getUserById
}