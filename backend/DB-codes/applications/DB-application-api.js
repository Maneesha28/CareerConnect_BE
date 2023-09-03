const Database = require('../database');
const database = new Database();

async function insertApplication(jobseeker_id, jobpost_id, resume){
    const sql = `INSERT INTO "Application" (jobseeker_id, jobpost_id, resume)
                VALUES ($1, $2, $3)`;
    const binds = [jobseeker_id, jobpost_id, resume];
    await database.execute(sql, binds);
}

async function getApplications(jobpost_id){
    const sql = `SELECT "Application".*, "Job_Seeker".name
                FROM "Application"
                INNER JOIN "Job_Seeker"
                ON "Application".jobseeker_id = "Job_Seeker".jobseeker_id 
                WHERE "Application".jobpost_id = $1`;
    const binds = [jobpost_id];
    result = (await database.execute(sql, binds)).rows;
    return result;
}

async function isApplied(jobseeker_id, jobpost_id){
    const sql = `SELECT COUNT(*) as is_applied FROM "Application" WHERE jobseeker_id = $1 AND jobpost_id = $2`;
    const binds = [jobseeker_id, jobpost_id];
    result = (await database.execute(sql, binds)).rows;
    return result[0];
}

module.exports = {
    insertApplication,
    getApplications,
    isApplied
}