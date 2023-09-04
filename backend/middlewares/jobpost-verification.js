require('dotenv').config();
const jwt = require('jsonwebtoken');
const DB_Jobpost = require('../DB-codes/jobposts/DB-jobpost-api');

async function verifyJobpostAccess(req, res, next){
    const cookie  = req.header('cookie');
    if(!cookie) return res.send({"status" : "Access Denied"});
    const token = cookie.slice(11);
    try{
        const verified = jwt.verify(token, process.env.JWT_TOKEN_HELPER);
        req.jobpost = await DB_Jobpost.getJobpost(req.params.jobpost_id);
        if(req.jobpost.company_id != verified.user_id) return res.send({"status" : "Access Denied"});
        next();
    }catch(err){
        res.status(400).send({"status" : "Access Denied"});
    }
}

module.exports = {
    verifyJobpostAccess
}