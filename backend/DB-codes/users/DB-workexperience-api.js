const Database = require('../database');
const database = new Database();

async function insertWork_Experience(jobseeker_id, organization, designation, employment_type, start_date, end_date){
    const sql = `INSERT INTO "Work_Experience" (jobseeker_id, organization, designation, employment_type, start_date, end_date)
                VALUES ($1, $2, $3 , $4, $5, $6)`;
    const binds = [jobseeker_id, organization, designation, employment_type, start_date, end_date];
    await database.execute(sql, binds);
}

async function editWork_Experience(organization, designation, employment_type, start_date, end_date, exp_id){
    const sql = `UPDATE "Work_Experience"
                SET organization = $1,
                designation = $2,
                employment_type = $3,
                start_date =  $4,
                end_date = $5
                WHERE exp_id = $6`
    const binds = [organization, designation, employment_type, start_date, end_date, exp_id];
    await database.execute(sql, binds);
}

async function deleteWork_Experience(exp_id){
    const sql = `DELETE FROM "Work_Experience" WHERE exp_id = $1`;
    const binds = [exp_id];
    await database.execute(sql, binds);
}

async function getWork_Experiences(jobseeker_id){
    const sql = `SELECT * FROM "Work_Experience" WHERE jobseeker_id = $1`;
    const binds = [jobseeker_id];
    await database.execute(sql, binds);
    result = (await database.execute(sql, binds)).rows;
    return result;
}

async function getWork_Experience(exp_id){
    const sql = `SELECT "Work_Experience".*, "Job_Seeker".user_id 
                FROM "Work_Experience"
                INNER JOIN "Job_Seeker"
                ON "Work_Experience".jobseeker_id = "Job_Seeker".jobseeker_id 
                WHERE "Work_Experience".exp_id = $1`;
    const binds = [exp_id];
    result = (await database.execute(sql, binds)).rows;
    return result[0];
}

module.exports = {
    insertWork_Experience,
    editWork_Experience,
    deleteWork_Experience,
    getWork_Experience,
    getWork_Experiences
}