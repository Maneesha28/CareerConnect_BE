const Database = require('../database');
const database = new Database();


async function insertCompany(user_id, company_name){
    const sql = `INSERT INTO "Company" (company_id, company_name)
                VALUES ($1, $2)`;
    const binds = [user_id, company_name];
    await database.execute(sql, binds);
}

async function editCompany(address, phone_no, website_address, company_logo, trade_license, about, company_name, company_id){
    const sql = `UPDATE "Company"
                SET address = COALESCE($1, address),
                    phone_no = COALESCE($2, phone_no),
                    website_address = COALESCE($3, website_address),
                    company_logo =  COALESCE($4, company_logo),
                    trade_license = COALESCE($5,trade_license),
                    about = COALESCE($6, about),
                    company_name = COALESCE($7, company_name)
                WHERE company_id = $8`
    const binds = [address, phone_no, website_address, company_logo, trade_license, about, company_name, company_id];
    await database.execute(sql, binds);
}

async function getCompany(company_id){
    const sql = `SELECT "Company".*, "User".email, "User".role 
                FROM "Company"
                INNER JOIN "User"
                ON "Company".company_id = "User".user_id
                WHERE "Company".company_id = $1`
    const binds = [company_id];
    result = (await database.execute(sql, binds)).rows;
    return result[0];
}

async function getCompanies(jobseeker_id){
    const sql = `SELECT 
                    "Company".*,
                    CASE WHEN "Follow".jobseeker_id IS NOT NULL THEN true ELSE false END AS is_following
                FROM "Company"
                LEFT JOIN "Follow"
                ON "Follow".company_id = "Company".company_id
                AND "Follow".jobseeker_id = $1`;
    const binds = [jobseeker_id];
    const result = (await database.execute(sql, binds)).rows;
    return result;
}

module.exports = {
    insertCompany,
    editCompany,
    getCompany,
    getCompanies
}