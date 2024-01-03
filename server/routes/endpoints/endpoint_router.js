const express = require('express')
const router = express.Router();
const {hashString} = require("../../helpers/tokenFunctions");
const {databaseQuery, objectID} = require("../../db/db_connect");
const dataRouter = require('./endpoint_data_router')

router.use('/fetch', dataRouter)
router.post('/list', async (req, res) => {
    try {
        const {tenantID} = res.locals.user;
        const list = await databaseQuery(async (client) => {
            return await client.collection('endpoints').find({tenantID}).toArray()
        })
        return res.status(200).send(list)
    } catch (e) {
        console.log(e)
    }
})
router.post('/new', async (req, res) => {
    try{
        const {urlHandle, key, projectID, customerID, name} = req.body;
        const {tenantID} = res.locals.user;

        const hashedKey = hashString(key)
        const hashedTenantID = hashString(tenantID.toString())

        await databaseQuery(async (client) => {
            return await client.collection('endpoints').insertOne({endpointName:name, hashedKey, tenantID, hashedTenantID, urlHandle, projectID: objectID(projectID), customerID: objectID(customerID)})
        })

        return res.status(200).send({message: 'success'})
    } catch (e) {
        console.log(e)
    }
})

module.exports = router;