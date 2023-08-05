const Database = require('../database');
const database = new Database();

async function insertEducation(jobseeker_id, degree, subject, institution, result, start_date, end_date){
    const sql = `INSERT INTO "Education" (jobseeker_id, degree, subject, institution, result, start_date, end_date)
                VALUES ($1, $2, $3 , $4, $5, $6, $7)`;
    const binds = [jobseeker_id, degree, subject, institution, result, start_date, end_date];
    await database.execute(sql, binds);
}

async function editEducation(degree, subject, institution, result, start_date, end_date, degree_id){
    const sql = `UPDATE "Education"
                SET degree = $1,
                    subject = $2,
                    institution = $3,
                    result =  $4,
                    start_date = $5,
                    end_date = $6
                WHERE degree_id = $7`
    const binds = [degree, subject, institution, result, start_date, end_date, degree_id];
    await database.execute(sql, binds);
}

async function deleteEducation(degree_id){
    const sql = `DELETE FROM "Education" WHERE degree_id = $1`;
    const binds = [degree_id];
    await database.execute(sql, binds);
}

async function getEducations(jobseeker_id){
    const sql = `SELECT * FROM "Education" WHERE jobseeker_id = $1`;
    const binds = [jobseeker_id];
    await database.execute(sql, binds);
    result = (await database.execute(sql, binds)).rows;
    return result;
}

async function getEducation(degree_id){
    const sql = `SELECT "Education".*, "Job_Seeker".user_id 
                FROM "Education"
                INNER JOIN "Job_Seeker"
                ON "Education".jobseeker_id = "Job_Seeker".jobseeker_id 
                WHERE "Education".degree_id = $1`;
    const binds = [degree_id];
    result = (await database.execute(sql, binds)).rows;
    return result[0];
}

module.exports = {
    insertEducation,
    editEducation,
    deleteEducation,
    getEducation,
    getEducations
}