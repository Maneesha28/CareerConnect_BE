require('dotenv').config();
const router = require('express').Router();
const DB_company = require('../../DB-codes/users/DB-company-api');
const { verifyCompany } = require('../../middlewares/user-verification');
const { verify } = require('../../middlewares/user-verification');

router.put('', verifyCompany, async (req, res) => {
    await DB_company.editCompany(req.body.address, req.body.phone_no, req.body.website_address, req.body.company_logo, 
        req.body.trade_license, req.body.about, req.body.company_name, req.user.company_id);
    res.send({"status" : "Company edited"});  
});

router.get('/all',verify,async (req, res) => {
    result = await DB_company.getCompanies(req.user.user_id);
    res.send(result);
});

router.get('/:company_id', verify, async (req, res) => {
    result = await DB_company.getCompany(req.params.company_id);
    if(result === undefined) res.send({"status" : "not a company"});
    res.send(result)
});

module.exports = router;