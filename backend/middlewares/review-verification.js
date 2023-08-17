require('dotenv').config();
const jwt = require('jsonwebtoken');
const DB_review = require('../DB-codes/reviews/DB-review-api');

async function verifyReviewAccess(req, res, next){
    const cookie  = req.header('cookie');
    if(!cookie) return res.send({"status" : "Access Denied"});
    const token = cookie.slice(11);
    try{
        const verified = jwt.verify(token, process.env.JWT_TOKEN_HELPER);
        req.review = await DB_review.getReview(req.params.review_id);
        if(req.review.jobseeker_id != verified.user_id) return res.send({"status" : "Access Denied"});
        next();
    }catch(err){
        res.status(400).send({"status" : "Access Denied"});
    }
}

module.exports = {
    verifyReviewAccess
}