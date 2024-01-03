const app = require('express')
const {databaseQuery, objectID} = require("../../db/db_connect");
const {hashString} = require("../../helpers/tokenFunctions");
const {getCurrentDate} = require("../../helpers/dateFunctions");
const router = app.Router()


router.post('/:hashedTenantID/:urlHandle', async (req, res) => {
    try {
        const {hashedTenantID, urlHandle} = req.params;
        const hashedKey = hashString(req.headers.key);
        const url = req.url;
        const {message} = req.body;

        const endpoint = await databaseQuery(async (client) => {
            return await client.collection('endpoints').findOne({hashedTenantID, urlHandle, hashedKey})
        })

        if(!endpoint) throw new Error('Hello')
        await databaseQuery(async (client) => {
            return await client.collection('endpoint_logs').insertOne({
                endpointID: endpoint._id,
                message,
                url,
                ip: req.ip,
                dateCreated: getCurrentDate(),
            })
        })
        return res.status(200).send({message: 'success'})

    } catch (e) {
        return res.status(500).send({message: "Can't validate key"})
    }
})

module.exports = router;