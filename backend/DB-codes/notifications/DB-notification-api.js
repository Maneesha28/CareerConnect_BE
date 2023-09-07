const Database = require('../database');
const database = new Database();

async function getAllNotifications(user_id){
    const sql = `SELECT "Notification".*
                FROM "Notification"
                INNER JOIN "User_Notification"
                ON "Notification".notification_id = "User_Notification".notification_id 
                WHERE "User_Notification".user_id = $1
                ORDER BY posted_on DESC`;
    const binds = [user_id];
    result = (await database.execute(sql, binds)).rows;
    return result;
}

async function getUnreadNotifications(user_id){
    let sql = `SELECT "Notification".*
                FROM "Notification"
                INNER JOIN "User_Notification"
                ON "Notification".notification_id = "User_Notification".notification_id 
                WHERE "User_Notification".user_id = $1
                AND "User_Notification".read = 'false'
                ORDER BY posted_on DESC`;
    const binds = [user_id];
    result = (await database.execute(sql, binds)).rows;
    return result;
}

async function markRead(user_id){
    //mark them read
    const sql = `UPDATE "User_Notification"
                SET read = 'true'
                WHERE user_id = $1 and read = 'false'`;
    const binds = [user_id];
    await database.execute(sql, binds);
}

async function getUnreadNotificationsCount(user_id){
    let sql = `SELECT COUNT("Notification".*) AS count
                FROM "Notification"
                INNER JOIN "User_Notification"
                ON "Notification".notification_id = "User_Notification".notification_id 
                WHERE "User_Notification".user_id = $1
                AND "User_Notification".read = 'false'`;
    const binds = [user_id];
    result = (await database.execute(sql, binds)).rows;
    return result[0];
}



module.exports = {
    getAllNotifications,
    getUnreadNotifications,
    markRead,
    getUnreadNotificationsCount
}