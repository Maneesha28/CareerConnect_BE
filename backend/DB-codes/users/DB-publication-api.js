const Database = require('../database');
const database = new Database();

async function insertPublication(jobseeker_id, title, authors, journal, pdf_link, publication_date){
    const sql = `INSERT INTO "Publications" (jobseeker_id, title, authors, journal, pdf_link, publication_date)
                VALUES ($1, $2, $3 , $4, $5, $6)`;
    const binds = [jobseeker_id, title, authors, journal, pdf_link, publication_date];
    await database.execute(sql, binds);
}

async function editPublication(title, authors, journal, pdf_link, publication_date, publication_id){
    const sql = `UPDATE "Publications"
                SET title = $1,
                    authors = $2,
                    journal = $3,
                    pdf_link =  $4,
                    publication_date = $5
                WHERE publication_id = $6`
    const binds = [title, authors, journal, pdf_link, publication_date, publication_id];
    await database.execute(sql, binds);
}

async function deletePublication(publication_id){
    const sql = `DELETE FROM "Publications" WHERE publication_id = $1`;
    const binds = [publication_id];
    await database.execute(sql, binds);
}

async function getPublications(jobseeker_id){
    const sql = `SELECT * FROM "Publications" WHERE jobseeker_id = $1`;
    const binds = [jobseeker_id];
    await database.execute(sql, binds);
    result = (await database.execute(sql, binds)).rows;
    return result;
}

async function getPublication(publication_id){
    const sql = `SELECT *
                FROM "Publications"
                WHERE publication_id = $1`;
    const binds = [publication_id];
    result = (await database.execute(sql, binds)).rows;
    return result[0];
}

module.exports = {
    insertPublication,
    editPublication,
    deletePublication,
    getPublication,
    getPublications
}