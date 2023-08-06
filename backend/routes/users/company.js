require('dotenv').config();
const router = require('express').Router();
const DB_company = require('../../DB-codes/users/DB-company-api');
const { verifyCompany } = require('../../middlewares/user-verification');
const { verify } = require('../../middlewares/user-verification');

router.put('/:company_id', verifyCompany, async (req, res) => {
    await DB_company.editCompany(req.body.address, req.body.phone_no, req.body.website_address, req.body.company_logo, 
        req.body.trade_license, req.body.description, req.body.company_name, req.params.company_id);
    res.send({"status" : "Company edited"});  
});

router.get('/:company_id', verify, async (req, res) => {
    result = await DB_company.getCompany(req.params.company_id);
    res.send(result)
});

module.exports = router;