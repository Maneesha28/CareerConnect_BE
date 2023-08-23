require('dotenv').config();
const router = require('express').Router();
const DB_user = require('../../DB-codes/users/DB-user-api');
const jwt = require('jsonwebtoken');
const {verify} = require('../../middlewares/user-verification');


router.get('', async (req, res) => {
    //console.log("Received GET request");

    const cookie = req.header('cookie');
    if (!cookie) {
        //console.log("No cookie found");
        return res.send({ "status": "Access Denied" });
    }

    const token = cookie.slice(11);
    //console.log("Token:", token);

    try {
        const verified = jwt.verify(token, process.env.JWT_TOKEN_HELPER);
        //console.log("Token verified:", verified);

        const user = await DB_user.getUserInfo(verified.user_id);
        //console.log("User fetched:", user);

        if (user === undefined) {
            //console.log("User not found");
            return res.send({ "status": "Access Denied" });
        } else {
            //console.log("Returning user:", user);
            return res.send(user);
        }
    } catch (err) {
        //console.log("Error:", err);
        return res.send({ "status": "Access Denied" });
    }
});


module.exports = router;