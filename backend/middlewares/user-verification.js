require('dotenv').config();
const jwt = require('jsonwebtoken');
const DB_user = require('../DB-codes/users/DB-user-api');
const DB_company = require('../DB-codes/users/DB-company-api');
const DB_jobseeker = require('../DB-codes/users/DB-jobseeker-api');
const DB_project = require('../DB-codes/users/DB-project-api');

//middleware function to verify the jwt token and find the user who is currently logged in
async function verify(req,res,next){
    const cookie  = req.header('cookie');
    if(!cookie) return res.redirect('/api/auth/login?status=Access Denied');
    const token = cookie.slice(11);
    try{
        const verified = jwt.verify(token, process.env.JWT_TOKEN_HELPER);
        req.user = await DB_user.getUserById(verified.user_id);
        next();
    }catch(err){
        res.status(400).send('Invalid Token');
    }
}

async function verifyCompany(req, res, next){
    const cookie  = req.header('cookie');
    if(!cookie) return res.redirect('/api/auth/login?status=Access Denied');
    const token = cookie.slice(11);
    try{
        const verified = jwt.verify(token, process.env.JWT_TOKEN_HELPER);
        req.user = await DB_company.getCompany(req.params.company_id);
        if(req.user.user_id != verified.user_id) return res.redirect('/api/auth/login?status=Access Denied');
        next();
    }catch(err){
        res.status(400).send('Invalid Token');
    }
}

async function verifyJobseeker(req, res, next){
    const cookie  = req.header('cookie');
    if(!cookie) return res.redirect('/api/auth/login?status=Access Denied');
    const token = cookie.slice(11);
    try{
        const verified = jwt.verify(token, process.env.JWT_TOKEN_HELPER);
        req.user = await DB_jobseeker.getJobseeker(req.params.jobseeker_id);
        if(req.user.user_id != verified.user_id) return res.redirect('/api/auth/login?status=Access Denied');
        next();
    }catch(err){
        res.status(400).send('Invalid Token');
    }
}

async function verifyProjectAccess(req, res, next){
    const cookie  = req.header('cookie');
    if(!cookie) return res.redirect('/api/auth/login?status=Access Denied');
    const token = cookie.slice(11);
    try{
        const verified = jwt.verify(token, process.env.JWT_TOKEN_HELPER);
        req.project = await DB_project.getProject(req.params.project_id);
        if(req.project.user_id != verified.user_id) return res.redirect('/api/auth/login?status=Access Denied');
        next();
    }catch(err){
        res.status(400).send('Invalid Token');
    }
}


module.exports = {
    verify,
    verifyCompany,
    verifyJobseeker,
    verifyProjectAccess
}