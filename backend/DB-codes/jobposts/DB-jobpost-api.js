const Database = require('../database');
const database = new Database();

async function insertJobpost(company_id, title, description, requirements, employment_type, salary, vacancy, deadline, keywords){
    const sql = `INSERT INTO "JobPost" (company_id, title, description, requirements, employment_type, salary, vacancy, deadline, keywords)
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`;
    const binds = [company_id, title, description, requirements, employment_type, salary, vacancy, deadline, keywords];
    await database.execute(sql, binds);
}

async function editJobpost(title, description, requirements, employment_type, salary, vacancy, deadline, keywords, jobpost_id){
    const sql = `UPDATE "JobPost"
                SET title = $1,
                    description = $2,
                    requirements = $3,
                    employment_type = $4, 
                    salary = $5, 
                    vacancy = $6, 
                    deadline = $7,
                    keywords = $8
                WHERE jobpost_id = $9`
    const binds = [title, description, requirements, employment_type, salary, vacancy, deadline, keywords, jobpost_id];
    await database.execute(sql, binds);
}

async function deleteJobpost(jobpost_id){
    const sql = `DELETE FROM "JobPost" WHERE jobpost_id = $1`;
    const binds = [jobpost_id];
    await database.execute(sql, binds);
}

async function getJobposts(company_id, jobseeker_id){
    const sql = `SELECT 
                    "JobPost".*, "Company".*, "User".email,
                    CASE WHEN "Job_Shortlist".jobseeker_id IS NOT NULL THEN true ELSE false END AS is_shortlisted
                FROM "JobPost"
                INNER JOIN "Company"
                ON "JobPost".company_id = "Company".company_id 
                INNER JOIN "User"
                ON "User".user_id = "Company".company_id 
                LEFT JOIN "Job_Shortlist"
                ON "JobPost".jobpost_id = "Job_Shortlist".jobpost_id
                    AND "Job_Shortlist".jobseeker_id = $2
                WHERE "Company".company_id = $1 and deadline >= CURRENT_DATE
                ORDER BY posted_on DESC`;
    const binds = [company_id, jobseeker_id];
    result = (await database.execute(sql, binds)).rows;
    return result;
}

async function getArchivedJobposts(company_id, jobseeker_id){
    const sql = `SELECT 
                    "JobPost".*, "Company".*, "User".email,
                    CASE WHEN "Job_Shortlist".jobseeker_id IS NOT NULL THEN true ELSE false END AS is_shortlisted
                FROM "JobPost"
                INNER JOIN "Company"
                ON "JobPost".company_id = "Company".company_id 
                INNER JOIN "User"
                ON "User".user_id = "Company".company_id 
                LEFT JOIN "Job_Shortlist"
                ON "JobPost".jobpost_id = "Job_Shortlist".jobpost_id
                    AND "Job_Shortlist".jobseeker_id = $2
                WHERE "Company".company_id = $1 and deadline < CURRENT_DATE
                ORDER BY posted_on DESC`;
    const binds = [company_id, jobseeker_id];
    result = (await database.execute(sql, binds)).rows;
    return result;
}

async function getRecentJobPosts(jobseeker_id){
    const sql = `SELECT 
                    "JobPost".*, "Company".*, "User".email,
                    CASE WHEN "Job_Shortlist".jobseeker_id IS NOT NULL THEN true ELSE false END AS is_shortlisted
                FROM "JobPost"
                INNER JOIN "Company"
                ON "JobPost".company_id = "Company".company_id 
                INNER JOIN "User"
                ON "User".user_id = "Company".company_id 
                LEFT JOIN "Job_Shortlist"
                ON "JobPost".jobpost_id = "Job_Shortlist".jobpost_id
                    AND "Job_Shortlist".jobseeker_id = $1
                WHERE deadline >= CURRENT_DATE
                ORDER BY posted_on DESC
                LIMIT 20`;
    const binds = [jobseeker_id];
    result = (await database.execute(sql, binds)).rows;
    return result;
}

async function getFollowedJobposts(jobseeker_id){
    const sql = `SELECT 
                    "JobPost".*, "Company".*, "User".email, 
                    CASE WHEN "Job_Shortlist".jobseeker_id IS NOT NULL THEN true ELSE false END AS is_shortlisted
                FROM "JobPost"
                INNER JOIN "Company"
                ON "JobPost".company_id = "Company".company_id 
                INNER JOIN "User"
                ON "User".user_id = "Company".company_id
                INNER JOIN "Follow"
                on "Follow".company_id = "Company".company_id 
                LEFT JOIN "Job_Shortlist"
                ON "JobPost".jobpost_id = "Job_Shortlist".jobpost_id
                    AND "Job_Shortlist".jobseeker_id = $1
                WHERE "Follow".jobseeker_id = $1
                AND deadline >= CURRENT_DATE
                ORDER BY posted_on DESC`;
    const binds = [jobseeker_id];
    result = (await database.execute(sql, binds)).rows;
    return result;
}

async function getAppliedJobposts(jobseeker_id){
    const sql = `SELECT 
                    "JobPost".*, "Company".*, "User".email, 
                    CASE WHEN "Job_Shortlist".jobseeker_id IS NOT NULL THEN true ELSE false END AS is_shortlisted
                FROM "JobPost"
                INNER JOIN "Company"
                ON "JobPost".company_id = "Company".company_id 
                INNER JOIN "User"
                ON "User".user_id = "Company".company_id
                INNER JOIN "Application"
                on "Application".jobpost_id = "JobPost".jobpost_id 
                LEFT JOIN "Job_Shortlist"
                ON "JobPost".jobpost_id = "Job_Shortlist".jobpost_id
                    AND "Job_Shortlist".jobseeker_id = $1
                WHERE "Application".jobseeker_id = $1
                ORDER BY posted_on DESC`;
    const binds = [jobseeker_id];
    result = (await database.execute(sql, binds)).rows;
    return result;
}

async function getSearchedJobposts(keyword, jobseeker_id){
    const sql = `SELECT 
                    "JobPost".*, "Company".*, "User".email, 
                    CASE WHEN "Job_Shortlist".jobseeker_id IS NOT NULL THEN true ELSE false END AS is_shortlisted
                FROM "JobPost"
                INNER JOIN "Company"
                ON "JobPost".company_id = "Company".company_id 
                INNER JOIN "User"
                ON "User".user_id = "Company".company_id 
                LEFT JOIN "Job_Shortlist"
                ON "JobPost".jobpost_id = "Job_Shortlist".jobpost_id
                    AND "Job_Shortlist".jobseeker_id = $2
                WHERE deadline >= CURRENT_DATE AND
                (
                    address ~* $1
                    OR company_name ~* $1
                    OR about ~* $1
                    OR title ~* $1
                    OR description ~* $1
                    OR requirements ~* $1
                    OR keywords ~* $1
                )
                ORDER BY posted_on DESC`;
    const binds = [keyword, jobseeker_id];
    result = (await database.execute(sql, binds)).rows;
    return result;
}

async function getJobpost(jobpost_id, jobseeker_id){
    const sql = `SELECT 
                    "JobPost".*, "Company".*, "User".email, 
                    CASE WHEN "Job_Shortlist".jobseeker_id IS NOT NULL THEN true ELSE false END AS is_shortlisted
                FROM "JobPost"
                INNER JOIN "Company"
                ON "JobPost".company_id = "Company".company_id 
                INNER JOIN "User"
                ON "User".user_id = "Company".company_id 
                LEFT JOIN "Job_Shortlist"
                ON "JobPost".jobpost_id = "Job_Shortlist".jobpost_id
                    AND "Job_Shortlist".jobseeker_id = $2
                WHERE "JobPost".jobpost_id = $1`;
    const binds = [jobpost_id, jobseeker_id];
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
                WHERE "Job_Shortlist".jobseeker_id = $1
                ORDER BY posted_on DESC`;
    const binds = [jobseeker_id];
    result = (await database.execute(sql, binds)).rows;
    return result;
}

async function isShortlisted(jobseeker_id, jobpost_id){
    const sql = `SELECT COUNT(*) as is_shortlisted FROM "Job_Shortlist" WHERE jobseeker_id = $1 AND jobpost_id = $2`;
    const binds = [jobseeker_id, jobpost_id];
    result = (await database.execute(sql, binds)).rows;
    return result[0];
}

async function getCompanyID(jobpost_id){
    const sql = `SELECT company_id FROM "JobPost" WHERE jobpost_id = $1`;
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
    getRecentJobPosts,
    getFollowedJobposts,
    getAppliedJobposts,
    getSearchedJobposts,
    getJobpost,
    insertShorlistedJob,
    deleteShortlistedJob,
    getShorlistedJobs,
    isShortlisted,
    getCompanyID
}