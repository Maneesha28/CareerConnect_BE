require('dotenv').config();
const jwt = require('jsonwebtoken');
const DB_user = require('../DB-codes/users/DB-user-api');
const DB_company = require('../DB-codes/users/DB-company-api');
const DB_jobseeker = require('../DB-codes/users/DB-jobseeker-api');
const DB_project = require('../DB-codes/users/DB-project-api');
const DB_education = require('../DB-codes/users/DB-education-api');
const DB_achievement = require('../DB-codes/users/DB-achievement-api');
const DB_workexperience = require('../DB-codes/users/DB-workexperience-api');
const DB_publication = require('../DB-codes/users/DB-publication-api');
const DB_skill = require('../DB-codes/users/DB-skill-api');

//middleware function to verify the jwt token and find the user who is currently logged in
async function verify(req,res,next){
    const cookie  = req.header('cookie');
    if(!cookie) return res.send({"status" : "Access Denied"});
    const token = cookie.slice(11);
    try{
        const verified = jwt.verify(token, process.env.JWT_TOKEN_HELPER);
        req.user = await DB_user.getUserById(verified.user_id);
        next();
    }catch(err){
        res.status(400).send({"status" : "Access Denied"});
    }
}

async function verifyCompany(req, res, next){
    const cookie  = req.header('cookie');
    if(!cookie) return res.send({"status" : "Access Denied"});
    const token = cookie.slice(11);
    try{
        const verified = jwt.verify(token, process.env.JWT_TOKEN_HELPER);
        req.user = await DB_company.getCompany(verified.user_id);
        if(req.user.company_id != verified.user_id) return res.send({"status" : "Access Denied"});
        next();
    }catch(err){
        res.status(400).send({"status" : "Access Denied"});
    }
}

async function verifyJobseeker(req, res, next){
    const cookie  = req.header('cookie');
    if(!cookie) return res.send({"status" : "Access Denied"});
    const token = cookie.slice(11);
    try{
        const verified = jwt.verify(token, process.env.JWT_TOKEN_HELPER);
        req.user = await DB_jobseeker.getJobseeker(verified.user_id);
        if(req.user.jobseeker_id != verified.user_id) return res.send({"status" : "Access Denied"});
        next();
    }catch(err){
        res.status(400).send({"status" : "Access Denied"});
    }
}

async function verifyProjectAccess(req, res, next){
    const cookie  = req.header('cookie');
    if(!cookie) return res.send({"status" : "Access Denied"});
    const token = cookie.slice(11);
    try{
        const verified = jwt.verify(token, process.env.JWT_TOKEN_HELPER);
        req.project = await DB_project.getProject(req.params.project_id);
        if(req.project.jobseeker_id != verified.user_id) return res.send({"status" : "Access Denied"});
        next();
    }catch(err){
        res.status(400).send({"status" : "Access Denied"});
    }
}

async function verifyEducationAccess(req, res, next){
    const cookie  = req.header('cookie');
    if(!cookie) return res.send({"status" : "Access Denied"});
    const token = cookie.slice(11);
    try{
        const verified = jwt.verify(token, process.env.JWT_TOKEN_HELPER);
        req.education = await DB_education.getEducation(req.params.degree_id);
        if(req.education.jobseeker_id != verified.user_id) return res.send({"status" : "Access Denied"});
        next();
    }catch(err){
        res.status(400).send({"status" : "Access Denied"});
    }
}

async function verifyAchievementAccess(req, res, next){
    const cookie  = req.header('cookie');
    if(!cookie) return res.send({"status" : "Access Denied"});
    const token = cookie.slice(11);
    try{
        const verified = jwt.verify(token, process.env.JWT_TOKEN_HELPER);
        req.achievement = await DB_achievement.getAchievement(req.params.achievement_id);
        if(req.achievement.jobseeker_id != verified.user_id) return res.send({"status" : "Access Denied"});
        next();
    }catch(err){
        res.status(400).send({"status" : "Access Denied"});
    }
}

async function verifyWorkExperienceAccess(req, res, next){
    const cookie  = req.header('cookie');
    if(!cookie) return res.send({"status" : "Access Denied"});
    const token = cookie.slice(11);
    try{
        const verified = jwt.verify(token, process.env.JWT_TOKEN_HELPER);
        req.workexperience = await DB_workexperience.getWork_Experience(req.params.exp_id);
        if(req.workexperience.jobseeker_id != verified.user_id) return res.send({"status" : "Access Denied"});
        next();
    }catch(err){
        res.status(400).send({"status" : "Access Denied"});
    }
}

async function verifyPublicationAccess(req, res, next){
    const cookie  = req.header('cookie');
    if(!cookie) return res.send({"status" : "Access Denied"});
    const token = cookie.slice(11);
    try{
        const verified = jwt.verify(token, process.env.JWT_TOKEN_HELPER);
        req.publication = await DB_publication.getPublication(req.params.publication_id);
        if(req.publication.jobseeker_id != verified.user_id) return res.send({"status" : "Access Denied"});
        next();
    }catch(err){
        res.status(400).send({"status" : "Access Denied"});
    }
}

async function verifySkillAccess(req, res, next){
    const cookie  = req.header('cookie');
    if(!cookie) return res.send({"status" : "Access Denied"});
    const token = cookie.slice(11);
    try{
        const verified = jwt.verify(token, process.env.JWT_TOKEN_HELPER);
        req.skill = await DB_skill.getSkill(req.params.skill_id);
        if(req.skill.jobseeker_id != verified.user_id) return res.send({"status" : "Access Denied"});
        next();
    }catch(err){
        res.status(400).send({"status" : "Access Denied"});
    }
}

module.exports = {
    verify,
    verifyCompany,
    verifyJobseeker,
    verifyProjectAccess,
    verifyEducationAccess,
    verifyAchievementAccess,
    verifyWorkExperienceAccess,
    verifyPublicationAccess,
    verifySkillAccess
}