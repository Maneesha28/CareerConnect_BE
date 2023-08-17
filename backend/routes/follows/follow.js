require('dotenv').config();
const router = require('express').Router();
const  DB_follow = require('../../DB-codes/follows/DB-follow-api');
const { verify, verifyJobseeker } = require('../../middlewares/user-verification');

router.post('', verifyJobseeker, async (req, res) => {
    await DB_follow.insertFollow(req.user.jobseeker_id, req.body.company_id);
    res.send({"status" : "Follow added"});
});

router.delete('', verifyJobseeker, async (req, res) => {
    await DB_follow.deleteFollow(req.user.jobseeker_id, req.body.company_id);
    res.send({"status" : "Follow deleted"});
});

router.get('/followers/:company_id', verify, async (req, res) => {
    result = await DB_follow.getFollowers(req.params.company_id);
    res.send(result);
});

router.get('/follower_count/:company_id', verify, async (req, res) => {
    result = await DB_follow.getFollowerCount(req.params.company_id);
    res.send(result);
});

router.get('/followings/:jobseeker_id', verify, async (req, res) => {
    result = await DB_follow.getFollowings(req.params.jobseeker_id);
    res.send(result);
});

router.get('/following_count/:jobseeker_id', verify, async (req, res) => {
    result = await DB_follow.getFollowingCount(req.params.jobseeker_id);
    res.send(result);
});




module.exports = router;