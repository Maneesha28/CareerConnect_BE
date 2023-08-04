require('dotenv').config();
const router = require('express').Router();
const DB_jobseeker = require('../../DB-codes/users/DB-jobseeker-api');
const { verifyJobseeker } = require('../../middlewares/user-verification');
const { verify } = require('../../middlewares/user-verification');

router.put('/:jobseeker_id', verifyJobseeker, async (req, res) => {
    await DB_jobseeker.editJobseeker(req.body.name, req.body.gender, req.body.profile_pic, req.body.date_of_birth,
            req.body.nationality, req.body.nid, req.body.address, req.body.phone_no, req.params.jobseeker_id);   
    res.send('Jobseeker edited');
});

router.get('/:jobseeker_id', verify, async (req, res) => {
    result = await DB_jobseeker.getJobseeker(req.params.jobseeker_id);
    res.send(result)
});

module.exports = router;