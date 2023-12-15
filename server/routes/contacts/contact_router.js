const express = require('express')
const router = express.Router()
const db = require('../../db/db_connect')
const {getCurrentDate} = require("../../helpers/dateFunctions");

router.post('/list',  async(req, res) => {
    const {tenantID} = res.locals.user;
    const list = await db.databaseQuery(async (client) => {
        return await client.collection('contacts').aggregate([
            {
                $match: {'tenantID': tenantID}
            },
            {
                $lookup: {
                    from: 'customers',
                    localField: 'customerID',
                    foreignField: '_id',
                    as: 'customer'
                }
            }
        ]).toArray();
    })
    return res.status(200).send(list)

})

router.post('/new', async (req, res) => {
    const name = req.body.name;
    const phone = req.body.phone || "N/A";
    const email = req.body.email || "N/A";
    const customerID = db.objectID(req.body.customerID);
    const {tenantID} = res.locals.user;

    const body = {name, phone, email, customerID, tenantID}

    const objID = await db.databaseQuery(async (client) => {
        const {insertedId} = await client.collection('contacts').insertOne(body)
        await client.collection('customers').updateOne(
            {"_id": customerID},
            {$push: {"contacts": insertedId}
        })
        return insertedId;
    })
    return res.status(200).send(objID)
})
router.post('/fetch', async (req, res) => {
    try{
        const contactID = db.objectID(req.body.contactID)
        const {tenantID} = res.locals.user;
        const contact = await db.databaseQuery(async (client) => {
            return await client.collection('contacts').aggregate([
                {$match: {'_id': contactID}},
                {$match: {'tenantID': tenantID}},
                {
                    $lookup: {
                        from: 'assets',
                        localField: 'assets',
                        foreignField: '_id',
                        as: 'assets'
                    }
                },
                {
                    $lookup: {
                        from: 'contact_notes',
                        localField: 'notes',
                        foreignField: '_id',
                        as: 'notes'
                    }
                }, {
                    $lookup: {
                        from: 'customers',
                        localField: 'customerID',
                        foreignField: '_id',
                        as: 'customer'
                    }
                }
            ]).toArray();
        });

        return res.status(200).send(contact[0])
    } catch (e) {
        console.log(e)
        return res.status(500).send({e});
    }
})
router.post('/add_note', async (req, res) => {
    try{
        const contactID = db.objectID(req.body.contactID)

        const note = req.body.note;
        const authorName = 'Matthew Low';
        const date = getCurrentDate();

        const {insertedId} = await db.databaseQuery(async (client) => {
            return await client.collection('contact_notes').insertOne({note, authorName, date})
        })

        await db.databaseQuery(async (client) => {
            await client.collection('contacts').updateOne(
                {"_id": contactID},
                {$push: {"notes": insertedId}}
            )
        })
        return res.status(200).send({message: 'success', insertedId})

    } catch (e) {
        console.log(e)
    }
})
router.post('/link_assets', async (req, res) => {
    try{
        const assetArray = db.objectIDArray(req.body.assetArray)
        const contactID = db.objectID(req.body.contactID)

        await db.databaseQuery(async (client) => {
            await client.collection('contacts').updateOne(
                {"_id": contactID},
                {$push: {"assets": {$each: assetArray}}}
            )
            for(const a of assetArray){
                await client.collection('assets').updateOne(
                    {"_id": a},
                    {$push: {"contacts": contactID}}
                )
            }
        })
        return res.status(200).send({message: 'assets added successfully'})
    } catch (e) {
        console.log(e)
        return res.status(500).send({'error': e.toString()})
    }



})

module.exports = router;