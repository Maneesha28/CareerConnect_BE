const Database = require('../database');
const database = new Database();

async function insertReview(jobseeker_id, company_id, comment, stars){
    const sql = `INSERT INTO "Review" (jobseeker_id, company_id, comment, stars)
                VALUES ($1, $2, $3, $4)`;
    const binds = [jobseeker_id, company_id, comment, stars];
    await database.execute(sql, binds);
}


async function editReview(comment, stars, review_id){
    const sql = `UPDATE "Review"
                SET comment = $1,
                    stars = $2
                WHERE review_id = $3`
    const binds = [comment, stars, review_id];
    await database.execute(sql, binds);
}

async function deleteReview(review_id){
    const sql = `DELETE FROM "Review" WHERE review_id = $1`;
    const binds = [review_id];
    await database.execute(sql, binds);
}

async function getReviews(company_id){
    const sql = `SELECT "Review".* , "Job_Seeker".name FROM "Review" INNER JOIN "Job_Seeker" 
                ON "Review".jobseeker_id = "Job_Seeker".jobseeker_id
                WHERE company_id = $1
                ORDER BY "time" DESC`;
    const binds = [company_id];
    result = (await database.execute(sql, binds)).rows;
    return result;
}

async function getAvgStars(company_id){
    const sql = `SELECT ROUND(AVG(stars)) as avg_stars FROM "Review" WHERE company_id = $1`;
    const binds = [company_id];
    result = (await database.execute(sql, binds)).rows;
    return result[0];
}

async function getReview(review_id){
    const sql = `SELECT *
                FROM "Review"
                WHERE review_id = $1`;
    const binds = [review_id];
    result = (await database.execute(sql, binds)).rows;
    return result[0];
}

module.exports = {
    insertReview,
    editReview,
    deleteReview,
    getReviews,
    getAvgStars,
    getReview
}