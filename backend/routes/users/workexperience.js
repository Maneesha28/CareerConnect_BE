require('dotenv').config();
const router = require('express').Router();
const DB_workexperience = require('../../DB-codes/users/DB-workexperience-api');
const { verifyJobseeker, verifyWorkExperienceAccess } = require('../../middlewares/user-verification');
const { verify } = require('../../middlewares/user-verification');

router.post('/:jobseeker_id', verifyJobseeker, async (req, res) => {
    await DB_workexperience.insertWork_Experience(req.params.jobseeker_id, req.body.organization, req.body.designation, req.body.employment_type, 
        req.body.start_date, req.body.end_date);   
    res.send({"status" : "Work Experience added"});
});

router.put('/:exp_id', verifyWorkExperienceAccess, async (req, res) => {
    await DB_workexperience.editWork_Experience( req.body.organization, req.body.designation, req.body.employment_type, 
        req.body.start_date, req.body.end_date, req.params.exp_id);   
    res.send({"status" : "Work Experience edited"});
});

router.delete('/:exp_id', verifyWorkExperienceAccess, async (req, res) => {
    await DB_workexperience.deleteWork_Experience(req.params.exp_id);
    res.send({"status" : "Work Experience deleted"});
});

router.get('/all/:jobseeker_id', verify, async (req, res) => {
    result = await DB_workexperience.getWork_Experiences(req.params.jobseeker_id);
    res.send(result);
});

router.get('/:exp_id', verify, async (req, res) => {
    result = await DB_workexperience.getWork_Experience(req.params.exp_id);
    res.send(result);
});

module.exports = router;