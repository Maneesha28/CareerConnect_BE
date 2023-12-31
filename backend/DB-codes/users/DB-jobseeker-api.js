const Database = require('../database');
const database = new Database();


async function insertJobseeker(user_id, name){
    const sql = `INSERT INTO "Job_Seeker" (jobseeker_id, name)
                VALUES ($1, $2)`;
    const binds = [user_id, name];
    await database.execute(sql, binds);
}

async function editJobseeker(name, gender, profile_pic, date_of_birth, nationality, nid, address, phone_no,github_link,about,linkedin_link, jobseeker_id){
    const sql = `UPDATE "Job_Seeker"
                SET name = COALESCE($1, name),
                    gender = COALESCE($2, gender),
                    profile_pic = COALESCE($3, profile_pic),
                    date_of_birth =  COALESCE($4, date_of_birth),
                    nationality = COALESCE($5,nationality),
                    nid = COALESCE($6, nid),
                    address = COALESCE($7, address),
                    phone_no = COALESCE($8, phone_no),
                    github_link = COALESCE($9, github_link),
                    about = COALESCE($10, about),
                    linkedin_link = COALESCE($11, linkedin_link)
                WHERE jobseeker_id = $12`
    const binds = [name, gender, profile_pic, date_of_birth, nationality, nid, address, phone_no,github_link,about,linkedin_link,jobseeker_id];
    await database.execute(sql, binds);
}

async function getJobseeker(jobseeker_id){
    const sql = `SELECT "Job_Seeker".*, "User".email, "User".role 
                FROM "Job_Seeker"
                INNER JOIN "User"
                ON "Job_Seeker".jobseeker_id = "User".user_id
                WHERE "Job_Seeker".jobseeker_id = $1`
    const binds = [jobseeker_id];
    result = (await database.execute(sql, binds)).rows;
    return result[0];
}

module.exports = {
    insertJobseeker,
    editJobseeker,
    getJobseeker
}