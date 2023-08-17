require('dotenv').config();
const router = require('express').Router();
const DB_review = require('../../DB-codes/reviews/DB-review-api');
const { verifyReviewAccess } = require('../../middlewares/review-verification');
const { verify, verifyJobseeker } = require('../../middlewares/user-verification');

router.post('', verifyJobseeker, async (req, res) => {
    await DB_review.insertReview(req.user.jobseeker_id, req.body.company_id, req.body.comment, req.body.stars);   
    res.send({"status" : "Review added"});
});

router.put('/:review_id', verifyReviewAccess, async (req, res) => {
    await DB_review.editReview(req.body.comment, req.body.stars, req.params.review_id);   
    res.send({"status" : "Review edited"});
});

router.delete('/:review_id', verifyReviewAccess, async (req, res) => {
    await DB_review.deleteReview(req.params.review_id);
    res.send({"status" : "Review deleted"});
});

router.get('/all/:company_id', verify, async (req, res) => {
    result = await DB_review.getReviews(req.params.company_id);
    res.send(result);
});

router.get('/avg_stars/:company_id', verify, async (req, res) => {
    result = await DB_review.getAvgStars(req.params.company_id);
    res.send(result);
});

router.get('/:review_id', verify, async (req, res) => {
    result = await DB_review.getReview(req.params.review_id);
    res.send(result);
});



module.exports = router;