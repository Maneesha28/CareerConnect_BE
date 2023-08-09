const Database = require('../database');
const database = new Database();


async function insertCompany(user_id){
    const sql = `INSERT INTO "Company" (company_id)
                VALUES ($1)`;
    const binds = [user_id];
    await database.execute(sql, binds);
}

async function editCompany(address, phone_no, website_address, company_logo, trade_license, description, company_name, company_id){
    const sql = `UPDATE "Company"
                SET address = COALESCE($1, address),
                    phone_no = COALESCE($2, phone_no),
                    website_address = COALESCE($3, website_address),
                    company_logo =  COALESCE($4, company_logo),
                    trade_license = COALESCE($5,trade_license),
                    description = COALESCE($6, description),
                    company_name = COALESCE($7, company_name)
                WHERE company_id = $8`
    const binds = [address, phone_no, website_address, company_logo, trade_license, description, company_name, company_id];
    await database.execute(sql, binds);
}

async function getCompany(company_id){
    const sql = `SELECT * FROM "Company" WHERE company_id = $1`
    const binds = [company_id];
    result = (await database.execute(sql, binds)).rows;
    return result[0];
}

module.exports = {
    insertCompany,
    editCompany,
    getCompany,
}