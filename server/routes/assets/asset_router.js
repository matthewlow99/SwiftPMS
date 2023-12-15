const express = require('express')
const router = express.Router()
const db = require('../../db/db_connect')
const {getCurrentDate} = require("../../helpers/dateFunctions");

router.post('/list', async (req, res) => {
    try {
        const filter = req.body.filter || {}
        const {tenantID} = res.locals.user;

        console.log(tenantID)

        const list = await db.databaseQuery(async (client) => {
            return await client.collection('assets').aggregate([
                {$match: {$and: [{}, {tenantID: tenantID}]}},
                {
                    $lookup: {
                        from: 'customers',
                        localField: 'customerID',
                        foreignField: '_id',
                        as: 'customer'
                    }
                }
            ]).toArray()
        })
        return res.status(200).send(list)
    } catch (e) {
        console.log(e)
        return res.status(501).send({error: e.toString()})
    }
})
router.post('/new', async (req, res) => {
    try {
        const assetName = req.body.assetName || "NA"
        const assetTagID = req.body.assetTagID || "NA"
        const customerID = db.objectID(req.body.customerID) || null
        const assetType = req.body.assetType || "NA"
        const {tenantID} = res.locals.user;

        const tempAsset = {
            assetName,
            assetType,
            assetTagID,
            customerID,
            tenantID
        }

        const obj = await db.databaseQuery(async (client) => {
            const {insertedId} = await client.collection('assets').insertOne(tempAsset)
            await client.collection('customers').updateOne(
                {"_id": customerID, 'tenantID': tenantID},
                {$push: {"assets": insertedId}
            })
            return insertedId;
        })

        return res.status(200).send(obj)

    } catch (e) {
        return res.status(500).send(e)
    }
})
router.post('/fetch', async (req, res) => {
    try {
        const assetID = db.objectID(req.body.assetID);
        const {tenantID} = res.locals.user;
        const list = await db.databaseQuery(async (client) =>{
            return await client.collection('assets').aggregate([
                {$match: {"_id": assetID}},
                {$match: {"tenantID": tenantID}},
                {
                    $lookup: {
                        from: 'contacts',
                        localField: 'contacts',
                        foreignField: '_id',
                        as: 'contacts'
                    }
                },
                {
                    $lookup: {
                        from: 'asset_notes',
                        localField: 'notes',
                        foreignField: '_id',
                        as: 'notes'
                    }
                },
                {
                    $lookup: {
                        from: 'customers',
                        localField: 'customerID',
                        foreignField: '_id',
                        as: 'customer'
                    }
                }
            ]).toArray()
        })
        return res.status(200).send(list[0])
    } catch (e) {
        return res.status(500).send(e)
    }
})

router.post('/link_contacts', async (req, res) => {
    try{
        const assetID = db.objectID(req.body.assetID);
        const contactArray = db.objectIDArray(req.body.contactArray);

        await db.databaseQuery(async (client) => {
            await client.collection('assets').updateOne(
                {"_id": assetID},
                {$push: {"contacts": {$each: contactArray}}}
            )
            for(const c of contactArray){
                await client.collection('contacts').updateOne(
                    {"_id": c},
                    {$push: {"assets": assetID}}
                )
            }
        })
        return res.status(200).send({message: 'contacts added successfully'})

    } catch (e) {
        console.log(e)
        return res.status(500).send({'error': e.toString()})
    }
})
router.post('/add_note', async (req, res) => {
    try{
        const assetID = db.objectID(req.body.assetID);
        const note = req.body.note;
        const authorName = 'Matthew Low'
        const date = getCurrentDate();

        const {insertedId} = await db.databaseQuery(async (client) => {
            return await client.collection('asset_notes').insertOne({note, authorName, date})
        })

        await db.databaseQuery(async (client) => {
            await client.collection('assets').updateOne(
                {'_id': assetID},
                {$push: {"notes": insertedId}}
            )
        })

        return res.status(200).send({message: 'success'})

    } catch (e) {
        console.log(e)
    }
})

module.exports = router;