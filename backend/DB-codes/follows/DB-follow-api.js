const Database = require('../database');
const database = new Database();

async function insertFollow(jobseeker_id, company_id){
    const sql = `INSERT INTO "Follow" (jobseeker_id, company_id)
                VALUES ($1, $2)`;
    const binds = [jobseeker_id, company_id];
    await database.execute(sql, binds);
}

async function deleteFollow(jobseeker_id, company_id){
    const sql = `DELETE FROM "Follow" WHERE jobseeker_id = $1 AND company_id = $2`;
    const binds = [jobseeker_id, company_id];
    await database.execute(sql, binds);
}

async function getFollowers(company_id){
    const sql = `SELECT * 
                FROM "Job_Seeker" INNER JOIN "Follow" 
                ON "Job_Seeker".jobseeker_id = "Follow".jobseeker_id 
                WHERE "Follow".company_id = $1`;
    const binds = [company_id];
    await database.execute(sql, binds);
    result = (await database.execute(sql, binds)).rows;
    return result;
}

async function getFollowerCount(company_id){
    const sql = `SELECT COUNT(*) as follower_count FROM "Follow" WHERE company_id = $1`;
    const binds = [company_id];
    await database.execute(sql, binds);
    result = (await database.execute(sql, binds)).rows;
    return result[0];
}

async function getFollowings(jobseeker_id){
    const sql = `SELECT * 
                FROM "Company" INNER JOIN "Follow" 
                ON "Company".company_id = "Follow".company_id 
                WHERE "Follow".jobseeker_id = $1`;
    const binds = [jobseeker_id];
    await database.execute(sql, binds);
    result = (await database.execute(sql, binds)).rows;
    return result;
}

async function getFollowingCount(jobseeker_id){
    const sql = `SELECT COUNT(*) as following_count FROM "Follow" WHERE jobseeker_id = $1`;
    const binds = [jobseeker_id];
    await database.execute(sql, binds);
    result = (await database.execute(sql, binds)).rows;
    return result[0];
}

module.exports = {
    insertFollow,
    deleteFollow,
    getFollowers,
    getFollowerCount,
    getFollowings,
    getFollowingCount
}