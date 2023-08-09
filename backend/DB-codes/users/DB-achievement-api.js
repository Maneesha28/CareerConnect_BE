const Database = require('../database');
const database = new Database();

async function insertAchievement(jobseeker_id, achievement_name, achievement_date, position,organized_by){
    const sql = `INSERT INTO "Achievements" (jobseeker_id, achievement_name, achievement_date, position,organized_by)
                VALUES ($1, $2, $3 , $4, $5)`;
    const binds = [jobseeker_id, achievement_name, achievement_date, position,organized_by];
    await database.execute(sql, binds);
}

async function editAchievement(achievement_name, achievement_date, position,organized_by, achievement_id){
    const sql = `UPDATE "Achievements"
                SET achievement_name = $1,
                achievement_date = $2,
                position = $3,
                organized_by =  $4
                WHERE achievement_id = $5`
    const binds = [achievement_name, achievement_date, position,organized_by, achievement_id];
    await database.execute(sql, binds);
}

async function deleteAchievement(achievement_id){
    const sql = `DELETE FROM "Achievements" WHERE achievement_id = $1`;
    const binds = [achievement_id];
    await database.execute(sql, binds);
}

async function getAchievements(jobseeker_id){
    const sql = `SELECT * FROM "Achievements" WHERE jobseeker_id = $1`;
    const binds = [jobseeker_id];
    await database.execute(sql, binds);
    result = (await database.execute(sql, binds)).rows;
    return result;
}

async function getAchievement(achievement_id){
    const sql = `SELECT *
                FROM "Achievements"
                WHERE achievement_id = $1`;
    const binds = [achievement_id];
    result = (await database.execute(sql, binds)).rows;
    return result[0];
}

module.exports = {
    insertAchievement,
    editAchievement,
    deleteAchievement,
    getAchievement,
    getAchievements
}