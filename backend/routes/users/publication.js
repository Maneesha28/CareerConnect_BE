require('dotenv').config();
const router = require('express').Router();
const DB_publication = require('../../DB-codes/users/DB-publication-api');
const { verifyJobseeker, verifyPublicationAccess } = require('../../middlewares/user-verification');
const { verify } = require('../../middlewares/user-verification');

router.post('/:jobseeker_id', verifyJobseeker, async (req, res) => {
    await DB_publication.insertPublication(req.params.jobseeker_id, req.body.title, req.body.authors, req.body.journal, req.body.pdf_link, 
        req.body.publication_date);   
    res.send({"status" : "Publication added"});
});

router.put('/:publication_id', verifyPublicationAccess, async (req, res) => {
    await DB_publication.editPublication(req.body.title, req.body.authors, req.body.journal, req.body.pdf_link, 
        req.body.publication_date, req.params.publication_id);   
    res.send({"status" : "Publication edited"});
});

router.delete('/:publication_id', verifyPublicationAccess, async (req, res) => {
    await DB_publication.deletePublication(req.params.publication_id);
    res.send({"status" : "Publication deleted"});
});

router.get('/all/:jobseeker_id', verify, async (req, res) => {
    result = await DB_publication.getPublications(req.params.jobseeker_id);
    res.send(result);
});

router.get('/:publication_id', verify, async (req, res) => {
    result = await DB_publication.getPublication(req.params.publication_id);
    res.send(result);
});

module.exports = router;