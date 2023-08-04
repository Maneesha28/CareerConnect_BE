const Database = require('../database');
const database = new Database();


async function insertJobseeker(user_id){
    const sql = `INSERT INTO "Job_Seeker" (user_id)
                VALUES ($1)`;
    const binds = [user_id];
    await database.execute(sql, binds);
}

async function editJobseeker(name, gender, profile_pic, date_of_birth, nationality, nid, address, phone_no, jobseeker_id){
    const sql = `UPDATE "Job_Seeker"
                SET name = COALESCE($1, name),
                    gender = COALESCE($2, gender),
                    profile_pic = COALESCE($3, profile_pic),
                    date_of_birth =  COALESCE($4, date_of_birth),
                    nationality = COALESCE($5,nationality),
                    nid = COALESCE($6, nid),
                    address = COALESCE($7, address),
                    phone_no = COALESCE($8, phone_no)
                WHERE jobseeker_id = $9`
    const binds = [name, gender, profile_pic, date_of_birth, nationality, nid, address, phone_no, jobseeker_id];
    await database.execute(sql, binds);
}

async function getJobseeker(jobseeker_id){
    const sql = `SELECT * FROM "Job_Seeker" WHERE jobseeker_id = $1`
    const binds = [jobseeker_id];
    result = (await database.execute(sql, binds)).rows;
    return result[0];
}

module.exports = {
    insertJobseeker,
    editJobseeker,
    getJobseeker
}