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
        return res.status(200).send(await fetchDataFromDB('project_notes', {projectID: objectID(req.body.id)}, null))
    } catch (e) { return res.status(500).send({e}) }
})
router.post('/tickets', async (req, res) => {
    try {
        return res.status(200).send(await fetchDataFromDB('tickets', {projectID: objectID(req.body.id)}, res.locals.user.tenantID))
    } catch (e) { return res.status(500).send({e}) }
})
router.post('/projects', async (req, res) => {
    try {
        return res.status(200).send(await fetchDataFromDB('projects', {"_id": objectID(req.body.id)}, res.locals.user.tenantID))
    } catch (e) { return res.status(500).send({message: 'error'}) }
})
router.post('/endpoints', async (req, res) => {
    try {
        return res.status(200).send(await fetchDataFromDB('endpoints', {projectID: objectID(req.body.id)}, res.locals.user.tenantID))
    } catch (e) { return res.status(500).send({message: 'error'}) }
})

module.exports = router;