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
    const sql = `SELECT "JobPost".*, "Company".*, "User".email 
                FROM "JobPost"
                INNER JOIN "Company"
                ON "JobPost".company_id = "Company".company_id 
                INNER JOIN "User"
                ON "User".user_id = "Company".company_id 
                WHERE "Company".company_id = $1 and deadline >= CURRENT_DATE`;
    const binds = [company_id];
    await database.execute(sql, binds);
    result = (await database.execute(sql, binds)).rows;
    return result;
}

async function getArchivedJobposts(company_id){
    const sql = `SELECT "JobPost".*, "Company".*, "User".email 
                FROM "JobPost"
                INNER JOIN "Company"
                ON "JobPost".company_id = "Company".company_id 
                INNER JOIN "User"
                ON "User".user_id = "Company".company_id 
                WHERE "Company".company_id = $1 and deadline < CURRENT_DATE`;
    const binds = [company_id];
    await database.execute(sql, binds);
    result = (await database.execute(sql, binds)).rows;
    return result;
}

async function getFollowedJobposts(jobseeker_id){
    const sql = `SELECT "JobPost".*, "Company".*, "User".email 
                FROM "JobPost"
                INNER JOIN "Company"
                ON "JobPost".company_id = "Company".company_id 
                INNER JOIN "User"
                ON "User".user_id = "Company".company_id
                INNER JOIN "Follow"
                on "Follow".company_id = "Company".company_id 
                WHERE "Follow".jobseeker_id = $1
                AND deadline >= CURRENT_DATE`;
    const binds = [jobseeker_id];
    await database.execute(sql, binds);
    result = (await database.execute(sql, binds)).rows;
    return result;
}

async function getSearchedJobposts(keyword){
    const sql = `SELECT "JobPost".*, "Company".*, "User".email 
                FROM "JobPost"
                INNER JOIN "Company"
                ON "JobPost".company_id = "Company".company_id 
                INNER JOIN "User"
                ON "User".user_id = "Company".company_id 
                WHERE deadline >= CURRENT_DATE AND
                (
                    address ~* $1
                    OR company_name ~* $1
                    OR "Company".description ~* $1
                    OR title ~* $1
                    OR "JobPost".description ~* $1
                    OR requirements ~* $1
                    OR employment_type ~* $1
                )`;
    const binds = [keyword];
    await database.execute(sql, binds);
    result = (await database.execute(sql, binds)).rows;
    return result;
}

async function getJobpost(jobpost_id){
    const sql = `SELECT "JobPost".*, "Company".*, "User".email 
                FROM "JobPost"
                INNER JOIN "Company"
                ON "JobPost".company_id = "Company".company_id 
                INNER JOIN "User"
                ON "User".user_id = "Company".company_id 
                WHERE jobpost_id = $1`;
    const binds = [jobpost_id];
    result = (await database.execute(sql, binds)).rows;
    return result[0];
}

async function insertShorlistedJob(jobseeker_id, jobpost_id){
    const sql = `INSERT INTO "Job_Shortlist" (jobseeker_id, jobpost_id)
                VALUES ($1, $2)`;
    const binds = [jobseeker_id, jobpost_id];
    await database.execute(sql, binds);
}

async function deleteShortlistedJob(jobseeker_id, jobpost_id){
    const sql = `DELETE FROM "Job_Shortlist" WHERE jobseeker_id = $1 AND jobpost_id = $2`;
    const binds = [jobseeker_id, jobpost_id];
    await database.execute(sql, binds);
}

async function getShorlistedJobs(jobseeker_id){
    const sql = `SELECT "JobPost".*, "Company".*, "User".email 
                FROM "JobPost"
                INNER JOIN "Company"
                ON "JobPost".company_id = "Company".company_id 
                INNER JOIN "User"
                ON "User".user_id = "Company".company_id
                INNER JOIN "Job_Shortlist"
                on "JobPost".jobpost_id = "Job_Shortlist".jobpost_id 
                WHERE "Job_Shortlist".jobseeker_id = $1`;
    const binds = [jobseeker_id];
    await database.execute(sql, binds);
    result = (await database.execute(sql, binds)).rows;
    return result;
}

async function isShortlisted(jobseeker_id, jobpost_id){
    const sql = `SELECT COUNT(*) as is_shortlisted FROM "Job_Shortlist" WHERE jobseeker_id = $1 AND jobpost_id = $2`;
    const binds = [jobseeker_id, jobpost_id];
    await database.execute(sql, binds);
    result = (await database.execute(sql, binds)).rows;
    return result[0];
}

module.exports = {
    insertJobpost,
    editJobpost,
    deleteJobpost,
    getJobposts,
    getArchivedJobposts,
    getFollowedJobposts,
    getSearchedJobposts,
    getJobpost,
    insertShorlistedJob,
    deleteShortlistedJob,
    getShorlistedJobs,
    isShortlisted
}