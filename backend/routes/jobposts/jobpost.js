require('dotenv').config();
const router = require('express').Router();
const  DB_Jobpost = require('../../DB-codes/jobposts/DB-jobpost-api');
const { verifyJobpostAccess } = require('../../middlewares/jobpost-verification');
const { verify, verifyCompany, verifyJobseeker } = require('../../middlewares/user-verification');


router.post('/shortlisted', verifyJobseeker, async (req, res) => {
    await DB_Jobpost.insertShorlistedJob(req.user.jobseeker_id, req.body.jobpost_id);   
    res.send({"status" : "Shorlisted Job added"});
});

router.delete('/shortlisted', verifyJobseeker, async (req, res) => {
    await DB_Jobpost.deleteShortlistedJob(req.user.jobseeker_id, req.body.jobpost_id);   
    res.send({"status" : "Shorlisted Job deleted"});
});

router.get('/shortlisted', verifyJobseeker, async (req, res) => {
    result = await DB_Jobpost.getShorlistedJobs(req.user.jobseeker_id);
    res.send(result);
});

router.get('/is_shortlisted/:jobpost_id', verifyJobseeker, async (req, res) => {
    result = await DB_Jobpost.isShortlisted(req.user.jobseeker_id, req.params.jobpost_id);
    res.send(result);
});

router.post('', verifyCompany, async (req, res) => {
    await DB_Jobpost.insertJobpost(req.user.company_id, req.body.title, req.body.description, req.body.requirements, 
        req.body.employment_type, req.body.salary, req.body.vacancy, req.body.deadline, req.body.keywords);   
    res.send({"status" : "Jobpost added"});
});

router.put('/:jobpost_id', verifyJobpostAccess, async (req, res) => {
    await DB_Jobpost.editJobpost(req.body.title, req.body.description, req.body.requirements, 
        req.body.employment_type, req.body.salary, req.body.vacancy, req.body.deadline, req.body.keywords, req.params.jobpost_id);
    res.send({"status" : "Jobpost edited"});
});

router.delete('/:jobpost_id', verifyJobpostAccess, async (req, res) => {
    await DB_Jobpost.deleteJobpost(req.params.jobpost_id);
    res.send({"status" : "Jobpost deleted"});
});

router.get('/all/:company_id', verify, async (req, res) => {
    result = await DB_Jobpost.getJobposts(req.params.company_id, req.user.user_id);
    res.send(result);
});

router.get('/archived/:company_id', verify, async (req, res) => {
    result = await DB_Jobpost.getArchivedJobposts(req.params.company_id, req.user.user_id);
    res.send(result);
});

router.get('/recent', verifyJobseeker, async (req, res) => {
    result = await DB_Jobpost.getRecentJobPosts(req.user.jobseeker_id);
    res.send(result);
});

router.get('/followed', verifyJobseeker, async (req, res) => {
    result = await DB_Jobpost.getFollowedJobposts(req.user.jobseeker_id);
    res.send(result);
});

router.get('/applied', verifyJobseeker, async (req, res) => {
    result = await DB_Jobpost.getAppliedJobposts(req.user.jobseeker_id);
    res.send(result);
});

router.get('/searched', verifyJobseeker, async (req, res) => {
    result = await DB_Jobpost.getSearchedJobposts(req.query.keyword, req.user.jobseeker_id);
    res.send(result);
});

router.get('/:jobpost_id', verify, async (req, res) => {
    result = await DB_Jobpost.getJobpost(req.params.jobpost_id, req.user.user_id);
    res.send(result);
});


module.exports = router;