require('dotenv').config();
const jwt = require('jsonwebtoken');
const DB_user = require('../DB-codes/users/DB-user-api');

//middleware function to verify the jwt token and find the user who is currently logged in
async function verify(req,res,next){
    const cookie  = req.header('cookie');
    if(!cookie) return res.redirect('/api/auth/login?status=Access Denied');
    const token = cookie.slice(11);
    try{
        const verified = jwt.verify(token, process.env.JWT_TOKEN_HELPER);
        req.user = await DB_user.getUserById(verified.user_id);
        next();
    }catch(err){
        res.status(400).send('Invalid Token');
    }
}

module.exports = {
    verify
}