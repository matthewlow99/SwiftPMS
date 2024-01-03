const app = require('express')
const {fetchDataFromDB, objectID} = require("../../db/db_connect");
const router = app.Router();

router.post('/customers', async (req, res) => {
    try {
        return res.status(200).send(await fetchDataFromDB('customers', {_id: objectID(req.body.id)}, res.locals.user.tenantID))
    } catch (e) { return res.status(500).send({e}) }
})
router.post('/notes', async (req, res) => {
    try {
        return res.status(200).send(await fetchDataFromDB('asset_notes', {assetID: objectID(req.body.id)}, null))
    } catch (e) { return res.status(500).send({e}) }
})
router.post('/tickets', async (req, res) => {
    try {
        return res.status(200).send(await fetchDataFromDB('tickets', {"assets": objectID(req.body.id)}, res.locals.user.tenantID, 'project'))
    } catch (e) { return res.status(500).send({e}) }
})
router.post('/assets', async (req, res) => {
    try {
        return res.status(200).send(await fetchDataFromDB('assets', {_id: objectID(req.body.id)}, res.locals.user.tenantID))
    } catch (e) {
        return res.status(500).send({e})
    }
})
router.post('/contacts', async (req, res) => {
    try {
        return res.status(200).send(await fetchDataFromDB('contacts', {'assets': objectID(req.body.id)}, res.locals.user.tenantID, 'customerID'))
    } catch (e) {
        return res.status(500).send({e})
    }
})

module.exports = router;