require('dotenv').config();
const router = require('express').Router();
const DB_skill = require('../../DB-codes/users/DB-skill-api');
const { verifyJobseeker, verifySkillAccess } = require('../../middlewares/user-verification');
const { verify } = require('../../middlewares/user-verification');

router.post('/:jobseeker_id', verifyJobseeker, async (req, res) => {
    await DB_skill.insertSkill(req.params.jobseeker_id, req.body.skill_name, req.body.expertise_level);   
    res.send('Skill added');
});

router.put('/:skill_id', verifySkillAccess, async (req, res) => {
    await DB_skill.editSkill(req.body.skill_name, req.body.expertise_level, req.params.skill_id);   
    res.send('Skill edited');
});

router.delete('/:skill_id', verifySkillAccess, async (req, res) => {
    await DB_skill.deleteSkill(req.params.skill_id);
    res.send('Skill deleted');
});

router.get('/all/:jobseeker_id', verify, async (req, res) => {
    result = await DB_skill.getSkills(req.params.jobseeker_id);
    res.send(result);
});

router.get('/:skill_id', verify, async (req, res) => {
    result = await DB_skill.getSkill(req.params.skill_id);
    res.send(result);
});

module.exports = router;