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

async function getSuggestedApplications(jobpost_id){
    const sql = `WITH JobPostSkills AS (
                    SELECT
                        ap.jobpost_id,
                        ap.jobseeker_id,
                        SUM(CASE WHEN sk.skill_name ~* js.keywords THEN 1 ELSE 0 END) AS skill_score
                    FROM
                        "Application" ap
                    INNER JOIN
                        "JobPost" js ON ap.jobpost_id = js.jobpost_id
                    LEFT JOIN
                        "Skills" sk ON ap.jobseeker_id = sk.jobseeker_id
                    GROUP BY
                        ap.jobpost_id, ap.jobseeker_id
                ),
                JobPostAchievements AS (
                    SELECT
                        ap.jobpost_id,
                        ap.jobseeker_id,
                        SUM(CASE WHEN ac.achievement_name ~* js.keywords THEN 1 ELSE 0 END) AS achievement_score
                    FROM
                        "Application" ap
                    INNER JOIN
                        "JobPost" js ON ap.jobpost_id = js.jobpost_id
                    LEFT JOIN
                        "Achievements" ac ON ap.jobseeker_id = ac.jobseeker_id
                    GROUP BY
                        ap.jobpost_id, ap.jobseeker_id
                ),
                JobPostProjects AS (
                    SELECT
                        ap.jobpost_id,
                        ap.jobseeker_id,
                        SUM(CASE WHEN CONCAT(CONCAT(pr.description, ' '),pr.technologies) ~* js.keywords THEN 1 ELSE 0 END) AS project_score
                    FROM
                        "Application" ap
                    INNER JOIN
                        "JobPost" js ON ap.jobpost_id = js.jobpost_id
                    LEFT JOIN
                        "Projects" pr ON ap.jobseeker_id = pr.jobseeker_id
                    GROUP BY
                        ap.jobpost_id, ap.jobseeker_id
                )
                SELECT
                    ap.*, js.name, 
                    COALESCE(jscore.skill_score, 0) + 5 * COALESCE(ascore.achievement_score, 0) + 3 * COALESCE(pscore.project_score, 0) AS total_score
                FROM
                    "Application" ap
                INNER JOIN
                    "Job_Seeker" js on ap.jobseeker_id = js.jobseeker_id
                LEFT JOIN
                    JobPostSkills jscore ON ap.jobpost_id = jscore.jobpost_id AND ap.jobseeker_id = jscore.jobseeker_id
                LEFT JOIN
                    JobPostAchievements ascore ON ap.jobpost_id = ascore.jobpost_id AND ap.jobseeker_id = ascore.jobseeker_id
                LEFT JOIN
                    JobPostProjects pscore ON ap.jobpost_id = pscore.jobpost_id AND ap.jobseeker_id = pscore.jobseeker_id
                WHERE ap.jobpost_id = $1
                ORDER BY total_score DESC;`;
    const binds = [jobpost_id];
    result = (await database.execute(sql, binds)).rows;
    return result;
}

async function getApplicationsCount(jobpost_id) {
    const sql = `SELECT COUNT("Application".jobpost_id) AS application_count
                FROM "Application"
                WHERE "Application".jobpost_id = $1`;
    const binds = [jobpost_id];
    result = (await database.execute(sql, binds)).rows;
    return result[0];
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
    getSuggestedApplications,
    getApplicationsCount,
    isApplied
}