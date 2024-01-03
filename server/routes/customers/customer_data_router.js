const app = require('express')
const router = app.Router();
const {objectID, databaseQuery, fetchDataFromDB} = require('../../db/db_connect')


const unwindField = "customer"
router.post('/customers', async (req, res) => {
    try {
        return res.status(200).send(await fetchDataFromDB('customers', {_id: objectID(req.body.id)}, res.locals.user.tenantID, unwindField))
    } catch (e) { return res.status(500).send({e}) }
})
router.post('/notes', async (req, res) => {
    try{
        return res.status(200).send(await fetchDataFromDB('customer_notes', {customerID: objectID(req.body.id)}, null, unwindField))
    } catch (e) {
        return res.status(500).send({e})
    }
})
router.post('/projects', async (req, res) => {
    try {
        return res.status(200).send(await fetchDataFromDB('projects', {customerID: objectID(req.body.id)}, res.locals.user.tenantID, unwindField))
    } catch (e) {
        return res.status(500).send({e})
    }
})
router.post('/tickets', async (req, res) => {
    try {
        return res.status(200).send(await fetchDataFromDB('tickets', {customerID: objectID(req.body.id)}, res.locals.user.tenantID, unwindField))
    } catch (e) {
        return res.status(500).send({e})
    }
})
router.post('/contacts', async (req, res) => {
    try {
        return res.status(200).send(await fetchDataFromDB('contacts', {customerID: objectID(req.body.id)}, res.locals.user.tenantID, unwindField))
    } catch (e) {
        return res.status(500).send({e})
    }
})
router.post('/assets', async (req, res) => {
    try {
        return res.status(200).send(await fetchDataFromDB('assets', {customerID: objectID(req.body.id)}, res.locals.user.tenantID, unwindField))
    } catch (e) {
        return res.status(500).send({e})
    }
})

module.exports = router;