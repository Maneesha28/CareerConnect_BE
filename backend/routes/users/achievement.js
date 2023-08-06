require('dotenv').config();
const router = require('express').Router();
const DB_achievement = require('../../DB-codes/users/DB-achievement-api');
const { verifyJobseeker, verifyAchievementAccess } = require('../../middlewares/user-verification');
const { verify } = require('../../middlewares/user-verification');

router.post('/:jobseeker_id', verifyJobseeker, async (req, res) => {
    await DB_achievement.insertAchievement(req.params.jobseeker_id, req.body.achievement_name, req.body.achievement_date, req.body.position, 
        req.body.organized_by);   
    res.send({"status" : "Achievement added"});
});

router.put('/:achievement_id', verifyAchievementAccess, async (req, res) => {
    await DB_achievement.editAchievement(req.body.achievement_name, req.body.achievement_date, req.body.position, 
        req.body.organized_by, req.params.achievement_id);   
    res.send({"status" : "Achievement edited"});
});

router.delete('/:achievement_id', verifyAchievementAccess, async (req, res) => {
    await DB_achievement.deleteAchievement(req.params.achievement_id);
    res.send({"status" : "Achievement deleted"});
});

router.get('/all/:jobseeker_id', verify, async (req, res) => {
    result = await DB_achievement.getAchievements(req.params.jobseeker_id);
    res.send(result);
});

router.get('/:achievement_id', verify, async (req, res) => {
    result = await DB_achievement.getAchievement(req.params.achievement_id);
    res.send(result);
});

module.exports = router;