const app = require('express')
const {fetchDataFromDB, objectID, databaseQuery} = require("../../db/db_connect");
const router = app.Router()

const unwindField = 'tickets';
router.post('/customers', async (req, res) => {
    try {
        return res.status(200).send(await fetchDataFromDB('customers', {_id: objectID(req.body.id)}, res.locals.user.tenantID))
    } catch (e) { return res.status(500).send({e}) }
})
router.post('/notes', async (req, res) => {
    try {
        return res.status(200).send(await fetchDataFromDB('ticket_notes', {ticketID: objectID(req.body.id)}, null, unwindField))
    } catch (e) { return res.status(500).send({e}) }
})
router.post('/contacts', async (req, res) => {
    try {
        return res.status(200).send(await fetchDataFromDB('contacts', {"tickets._id": objectID(req.body.id)}, res.locals.user.tenantID, unwindField))
    } catch (e) { return res.status(500).send({message: 'error'}) }
})
router.post('/tickets', async (req, res) => {
    try {
        return res.status(200).send(await fetchDataFromDB('tickets', {_id: objectID(req.body.id)}, res.locals.user.tenantID, unwindField))
    } catch (e) { return res.status(500).send({e}) }
})
router.post('/assets', async (req, res) => {
    try {
        return res.status(200).send(await fetchDataFromDB('assets', {"tickets._id": objectID(req.body.id)}, res.locals.user.tenantID, unwindField))
    } catch (e) { return res.status(500).send({message: 'error'}) }
})
router.post('/projects', async (req, res) => {
    try {
        return res.status(200).send(await fetchDataFromDB('projects', {"tickets._id": objectID(req.body.id)}, res.locals.user.tenantID, unwindField))
    } catch (e) { return res.status(500).send({message: 'error'}) }
})



module.exports = router