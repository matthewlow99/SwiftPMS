const app = require('express')
const {fetchDataFromDB, objectID} = require("../../db/db_connect");
const router = app.Router()

router.post('/logs', async (req, res) => {
    try {
        return res.status(200).send(await fetchDataFromDB('endpoint_logs', {endpointID: objectID(req.body.id)}, null))
    } catch (e) {
        return res.status(500).send({message: 'error'})
    }
})
router.post('/endpoints', async (req, res) => {
    try {
        return res.status(200).send(await fetchDataFromDB('endpoints', {"_id": objectID(req.body.id)}, res.locals.user.tenantID))
    } catch (e) {
        return res.status(500).send({message: 'error'})
    }
})

module.exports = router;