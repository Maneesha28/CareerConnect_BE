const Database = require('../database');
const database = new Database();

async function insertJobpost(company_id, title, description, requirements, employment_type, salary, vacancy, deadline){
    const sql = `INSERT INTO "JobPost" (company_id, title, description, requirements, employment_type, salary, vacancy, deadline)
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`;
    const binds = [company_id, title, description, requirements, employment_type, salary, vacancy, deadline];
    await database.execute(sql, binds);
}

async function editJobpost(title, description, requirements, employment_type, salary, vacancy, deadline, jobpost_id){
    const sql = `UPDATE "JobPost"
                SET title = $1,
                    description = $2,
                    requirements = $3,
                    employment_type = $4, 
                    salary = $5, 
                    vacancy = $6, 
                    deadline = $7
                WHERE jobpost_id = $8`
    const binds = [title, description, requirements, employment_type, salary, vacancy, deadline, jobpost_id];
    await database.execute(sql, binds);
}

async function deleteJobpost(jobpost_id){
    const sql = `DELETE FROM "JobPost" WHERE jobpost_id = $1`;
    const binds = [jobpost_id];
    await database.execute(sql, binds);
}

async function getJobposts(company_id){
    const sql = `SELECT * FROM "JobPost" WHERE company_id = $1 and deadline >= CURRENT_DATE`;
    const binds = [company_id];
    await database.execute(sql, binds);
    result = (await database.execute(sql, binds)).rows;
    return result;
}

async function getArchivedJobposts(company_id){
    const sql = `SELECT * FROM "JobPost" WHERE company_id = $1 and deadline < CURRENT_DATE`;
    const binds = [company_id];
    await database.execute(sql, binds);
    result = (await database.execute(sql, binds)).rows;
    return result;
}

async function getJobpost(jobpost_id){
    const sql = `SELECT *
                FROM "JobPost"
                WHERE jobpost_id = $1`;
    const binds = [jobpost_id];
    result = (await database.execute(sql, binds)).rows;
    return result[0];
}

module.exports = {
    insertJobpost,
    editJobpost,
    deleteJobpost,
    getJobposts,
    getArchivedJobposts,
    getJobpost
}