require('dotenv').config();
const router = require('express').Router();
const  DB_Jobpost = require('../../DB-codes/jobposts/DB-jobpost-api');
const { verifyJobpostAccess } = require('../../middlewares/jobpost-verification');
const { verify, verifyCompany } = require('../../middlewares/user-verification');

router.post('', verifyCompany, async (req, res) => {
    await DB_Jobpost.insertJobpost(req.user.company_id, req.body.title, req.body.description, req.body.requirements, 
        req.body.employment_type, req.body.salary, req.body.vacancy, req.body.deadline);   
    res.send({"status" : "Jobpost added"});
});

router.put('/:jobpost_id', verifyJobpostAccess, async (req, res) => {
    await DB_Jobpost.editJobpost(req.body.title, req.body.description, req.body.requirements, 
        req.body.employment_type, req.body.salary, req.body.vacancy, req.body.deadline, req.params.jobpost_id);
    res.send({"status" : "Jobpost edited"});
});

router.delete('/:jobpost_id', verifyJobpostAccess, async (req, res) => {
    await DB_Jobpost.deleteJobpost(req.params.jobpost_id);
    res.send({"status" : "Jobpost deleted"});
});

router.get('/all/:company_id', verify, async (req, res) => {
    result = await DB_Jobpost.getJobposts(req.params.company_id);
    res.send(result);
});

router.get('/archived', verifyCompany, async (req, res) => {
    result = await DB_Jobpost.getArchivedJobposts(req.user.company_id);
    res.send(result);
});

router.get('/:jobpost_id', verify, async (req, res) => {
    result = await DB_Jobpost.getJobpost(req.params.jobpost_id);
    res.send(result);
});



module.exports = router;