require('dotenv').config();
const router = require('express').Router();
const DB_education = require('../../DB-codes/users/DB-education-api');
const { verifyJobseeker, verifyEducationAccess } = require('../../middlewares/user-verification');
const { verify } = require('../../middlewares/user-verification');

router.post('/:jobseeker_id', verifyJobseeker, async (req, res) => {
    await DB_education.insertEducation(req.params.jobseeker_id, req.body.degree, req.body.subject, req.body.institution, req.body.result, 
        req.body.start_date, req.body.end_date);   
    res.send({"status" : "Education added"});
});

router.put('/:degree_id', verifyEducationAccess, async (req, res) => {
    await DB_education.editEducation(req.body.degree, req.body.subject, req.body.institution, req.body.result, 
        req.body.start_date, req.body.end_date, req.params.degree_id);   
    res.send({"status" : "Education edited"});
});

router.delete('/:degree_id', verifyEducationAccess, async (req, res) => {
    await DB_education.deleteEducation(req.params.degree_id);
    res.send({"status" : "Education deleted"});
});

router.get('/all/:jobseeker_id', verify, async (req, res) => {
    result = await DB_education.getEducations(req.params.jobseeker_id);
    res.send(result);
});

router.get('/:degree_id', verify, async (req, res) => {
    result = await DB_education.getEducation(req.params.degree_id);
    res.send(result);
});

module.exports = router;