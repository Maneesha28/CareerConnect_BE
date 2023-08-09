const Database = require('../database');
const database = new Database();

async function insertSkill(jobseeker_id, skill_name,expertise_level){
    const sql = `INSERT INTO "Skills" (jobseeker_id, skill_name,expertise_level)
                VALUES ($1, $2, $3)`;
    const binds = [jobseeker_id, skill_name,expertise_level];
    await database.execute(sql, binds);
}

async function editSkill(skill_name,expertise_level, skill_id){
    const sql = `UPDATE "Skills"
                SET skill_name = $1,
                    expertise_level = $2
                WHERE skill_id = $3`
    const binds = [skill_name,expertise_level, skill_id];
    await database.execute(sql, binds);
}

async function deleteSkill(skill_id){
    const sql = `DELETE FROM "Skills" WHERE skill_id = $1`;
    const binds = [skill_id];
    await database.execute(sql, binds);
}

async function getSkills(jobseeker_id){
    const sql = `SELECT * FROM "Skills" WHERE jobseeker_id = $1`;
    const binds = [jobseeker_id];
    await database.execute(sql, binds);
    result = (await database.execute(sql, binds)).rows;
    return result;
}

async function getSkill(skill_id){
    const sql = `SELECT *
                FROM "Skills"
                WHERE skill_id = $1`;
    const binds = [skill_id];
    result = (await database.execute(sql, binds)).rows;
    return result[0];
}

module.exports = {
    insertSkill,
    editSkill,
    deleteSkill,
    getSkill,
    getSkills
}