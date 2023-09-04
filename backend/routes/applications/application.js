require('dotenv').config();
const router = require('express').Router();
const  DB_Application = require('../../DB-codes/applications/DB-application-api');
const { verifyJobpostAccess } = require('../../middlewares/jobpost-verification');
const { verifyJobseeker } = require('../../middlewares/user-verification');


router.post('', verifyJobseeker, async (req, res) => {
    await DB_Application.insertApplication(req.user.jobseeker_id, req.body.jobpost_id, req.body.resume);   
    res.send({"status" : "Application added"});
});

router.get('/:jobpost_id', verifyJobpostAccess, async (req, res) => {
    result = await DB_Application.getApplications(req.params.jobpost_id);
    res.send(result);
});

router.get('/is_applied/:jobpost_id', verifyJobseeker, async (req, res) => {
    result = await DB_Application.isApplied(req.user.jobseeker_id, req.params.jobpost_id);
    res.send(result);
});

module.exports = router;