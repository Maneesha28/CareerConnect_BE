require('dotenv').config();
const { Client } = require('pg')


class Database {
    // code to execute sql
    execute = async function (sql, binds) {
        if(Database.client === undefined){
            Database.client = new Client({
                host: process.env.DB_host,
                port: process.env.DB_port,
                database: process.env.DB_name,
                user: process.env.DB_user,
                password: process.env.DB_password,
            })
            Database.client.connect(function(err) {
                if (err) throw err;
                console.log("Connected!");
            });
        }
        let results;
        try {
            results = await Database.client.query(sql,binds);
            return results;
        } catch (err) {
            console.log("ERROR executing sql: " + err.message);
            console.log("SQL: ", sql);
            console.log(binds);
        }
    };
}
module.exports = Database;
