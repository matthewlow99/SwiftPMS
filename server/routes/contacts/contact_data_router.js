const app = require('express')
const {fetchDataFromDB, objectID} = require("../../db/db_connect");
const router = app.Router();


router.post('/notes', async (req, res) => {
    try {
        return res.status(200).send(await fetchDataFromDB('contact_notes', {contactID: objectID(req.body.id)}, null))
    } catch (e) { return res.status(500).send({e}) }
})
router.post('/tickets', async (req, res) => {
    try {
        return res.status(200).send(await fetchDataFromDB('tickets', {contacts: objectID(req.body.id)}, res.locals.user.tenantID, 'project'))
    } catch (e) { return res.status(500).send({e}) }
})
router.post('/contacts', async (req, res) => {
    try {
        return res.status(200).send(await fetchDataFromDB('contacts', {'_id': objectID(req.body.id)}, res.locals.user.tenantID, 'customerID'))
    } catch (e) {
        return res.status(500).send({e})
    }
})
router.post('/assets', async (req, res) => {
    try {
        return res.status(200).send(await fetchDataFromDB('assets', {'contacts': objectID(req.body.id)}, res.locals.user.tenantID, 'project'))
    } catch (e) {
        return res.status(500).send({e})
    }
})



module.exports = router;