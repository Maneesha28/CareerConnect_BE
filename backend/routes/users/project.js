require('dotenv').config();
const router = require('express').Router();
const DB_project = require('../../DB-codes/users/DB-project-api');
const { verifyJobseeker, verifyProjectAccess } = require('../../middlewares/user-verification');
const { verify } = require('../../middlewares/user-verification');

router.post('', verifyJobseeker, async (req, res) => {
    await DB_project.insertProject(req.user.jobseeker_id, req.body.title, req.body.description, req.body.project_link, req.body.technologies, 
        req.body.start_date, req.body.end_date);   
    res.send({"status" : "Project added"});
});

router.put('/:project_id', verifyProjectAccess, async (req, res) => {
    await DB_project.editProject(req.body.title, req.body.description, req.body.project_link, req.body.technologies, 
        req.body.start_date, req.body.end_date, req.params.project_id);   
    res.send({"status" : "Project edited"});
});

router.delete('/:project_id', verifyProjectAccess, async (req, res) => {
    await DB_project.deleteProject(req.params.project_id);
    res.send({"status" : "Project deleted"});
});

router.get('/all/:jobseeker_id', verify, async (req, res) => {
    result = await DB_project.getProjects(req.params.jobseeker_id);
    res.send(result);
});

router.get('/:project_id', verify, async (req, res) => {
    result = await DB_project.getProject(req.params.project_id);
    res.send(result);
});

module.exports = router;