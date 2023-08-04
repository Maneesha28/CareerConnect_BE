const Database = require('../database');
const database = new Database();

async function insertProject(jobseeker_id, title, description, project_link, technologies, start_date, end_date){
    const sql = `INSERT INTO "Projects" (jobseeker_id, title, description, project_link, technologies, start_date, end_date)
                VALUES ($1, $2, $3 , $4, $5, $6, $7)`;
    const binds = [jobseeker_id, title, description, project_link, technologies, start_date, end_date];
    await database.execute(sql, binds);
}

async function editProject(title, description, project_link, technologies, start_date, end_date, project_id){
    const sql = `UPDATE "Projects"
                SET title = $1,
                    description = $2,
                    project_link = $3,
                    technologies =  $4,
                    start_date = $5,
                    end_date = $6
                WHERE project_id = $7`
    const binds = [title, description, project_link, technologies, start_date, end_date, project_id];
    await database.execute(sql, binds);
}

async function deleteProject(project_id){
    const sql = `DELETE FROM "Projects" WHERE project_id = $1`;
    const binds = [project_id];
    await database.execute(sql, binds);
}

async function getProjects(jobseeker_id){
    const sql = `SELECT * FROM "Projects" WHERE jobseeker_id = $1`;
    const binds = [jobseeker_id];
    await database.execute(sql, binds);
    result = (await database.execute(sql, binds)).rows;
    return result;
}

async function getProject(project_id){
    const sql = `SELECT "Projects".*, "Job_Seeker".user_id 
                FROM "Projects"
                INNER JOIN "Job_Seeker"
                ON "Projects".jobseeker_id = "Job_Seeker".jobseeker_id 
                WHERE "Projects".project_id = $1`;
    const binds = [project_id];
    result = (await database.execute(sql, binds)).rows;
    return result[0];
}

module.exports = {
    insertProject,
    editProject,
    deleteProject,
    getProject,
    getProjects
}