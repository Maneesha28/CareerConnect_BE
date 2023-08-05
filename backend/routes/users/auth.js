require('dotenv').config();
const router = require('express').Router();
const DB_user = require('../../DB-codes/users/DB-user-api');
const DB_jobseeker = require('../../DB-codes/users/DB-jobseeker-api')
const DB_company = require('../../DB-codes/users/DB-company-api')
const bcrypt= require('bcryptjs');
const jwt = require('jsonwebtoken');
const {verify} = require('../../middlewares/user-verification');


router.post('/register', async (req, res) => {
    result = await DB_user.getUserByEmail(req.body.email);
    if(result != undefined){
        res.send("Email already exists");
    }else{
        //hash the password
        const hashedPassword = await bcrypt.hash(req.body.password, await bcrypt.genSalt(10));
        //insert user
        await DB_user.insertUser(req.body.email, req.body.role, hashedPassword);
        //insert into jobseeker or company according to their role
        result = await DB_user.getUserByEmail(req.body.email);
        if(result.role === "jobseeker") await DB_jobseeker.insertJobseeker(result.user_id);
        else await DB_company.insertCompany(result.user_id);
        res.send("Successfully registered");
    }
});

router.post('/login', async (req, res) => {
    result = await DB_user.getUserByEmail(req.body.email);
    // if no result, there is no such user
    if (result === undefined) {
        res.send('Wrong Email');
    } else {
        // match passwords
        const validPass = await bcrypt.compare(req.body.password, result.password);
        if (validPass) {
            // if successful login the user
            const token = jwt.sign({ user_id: result.user_id }, process.env.JWT_TOKEN_HELPER);
            let options = {
                maxAge: 90000000, 
                httpOnly: true
            }
            res.cookie('auth-token', token, options);
            res.send('logged in');
        }
        else {
            res.send('Wrong Password');
        }
    }
    
});

router.post('/logout', verify ,(req,res)=>{
    //destroy token
    res.cookie('auth-token', '', { maxAge:1 });
    res.send("logged out");
    // res.redirect('/api/auth/login');
});


module.exports = router;