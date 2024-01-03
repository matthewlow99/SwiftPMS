const express = require('express')
const router = express.Router()
const db = require('../../db/db_connect')
const {getCurrentDate} = require("../../helpers/dateFunctions");
const {objectID, objectIDJSON} = require("../../db/db_connect");
const dataRouter = require('./ticket_data_router');

router.use('/fetch', dataRouter)

router.post('/list', async (req, res) => {
    const {tenantID} = res.locals.user;
    const filter = objectIDJSON(req.body.filter) || {};

    const list = await db.databaseQuery(async (client) => {
        return client.collection('tickets').aggregate([
            {
                $match: {tenantID: tenantID}
            },
            {
                $match: filter
            },
            {
                $lookup: {
                    from: 'customers',
                    localField: 'customerID',
                    foreignField: '_id',
                    as: 'customer'
                }
            },
            {
                $lookup: {
                    from: 'projects',
                    localField: 'projectID',
                    foreignField: '_id',
                    as: 'project'
                }
            },
            {
                $unwind: "$customer"
            },
            {
                $unwind: "$project"
            },
        ]).toArray()
    })
    console.log(req.body.filter)
    return res.status(200).send(list)
})

router.post('/new', async (req, res) => {
    try {
        const ticketSubject = req.body.subject;
        const customerID = db.objectID(req.body.customerID);
        const projectID = db.objectID(req.body.projectID);
        const description = req.body.desc;
        const {tenantID} = res.locals.user;

        const body = {
            ticketSubject,
            customerID,
            projectID,
            description,
            tenantID,
            isOpen: true,
            status: 'New',
            createdDate: getCurrentDate(),
            updatedDate: getCurrentDate(),
            contacts: [],
            assets: [],
            notes: [],
        }

        const objID = await db.databaseQuery(async (client) => {
            const {insertedId} = await client.collection('tickets').insertOne(body)
            await client.collection('customers').updateOne(
                {"_id": customerID},
                {$push: {"tickets": insertedId}}
            )
            await client.collection('projects').updateOne(
                {"_id": projectID},
                {$addToSet: {"tickets": insertedId}}
            )
            return insertedId
        })

        return res.status(200).send(objID)
    }
    catch (e) {
        return res.status(500).send({error: e.toString()})
    }
})
router.post('/add_note', async (req, res) => {
    try {
        const ticketID = db.objectID(req.body.id)
        const note = req.body.note;
        const authorName = 'Matthew Low';
        const date = getCurrentDate();

        const {insertedId} = await db.databaseQuery(async (client) => {
            return await client.collection('ticket_notes').insertOne({note, authorName, date, ticketID})
        })
        await db.databaseQuery(async (client) => {
            return await client.collection('tickets').updateOne(
                {'_id': ticketID},
                {$push: {'notes': insertedId}}
            )
        })
        return res.status(200).send({message: 'success'})

    } catch (e) {
        console.log(e)
        return res.status(500).send({message: 'Error'})
    }
})
router.post('/link_contacts', async (req, res) => {
    try {
        const ticketID = db.objectID(req.body.ticketID)
        const contactArray = db.objectIDArray(req.body.contactArray)
        const {tenantID} = res.locals.user;

       await db.databaseQuery(async (client) => {
            await client.collection('tickets').updateOne(
                {'_id': ticketID, 'tenantID': tenantID},
                {$push: {"contacts": {$each: contactArray}}}
            )
           for(const c of contactArray){
               await client.collection('contacts').updateOne(
                   {"_id": c},
                   {$addToSet: {"tickets": ticketID}}
               )
           }
        })

        return res.status(200).send({message: "success"})

    } catch (e) {
        console.log(e)
        return res.status(500).send({e: e.toString()})
    }
})
router.post('/link_assets', async (req, res) => {
    try {
        const ticketID = db.objectID(req.body.ticketID)
        const assetArray = db.objectIDArray(req.body.assetArray)
        const {tenantID} = res.locals.user;

        await db.databaseQuery(async (client) => {
            await client.collection('tickets').updateOne(
                {"_id": ticketID, "tenantID": tenantID},
                {$push: {"assets": {$each: assetArray}}}
            )
            for(const a of assetArray){
                await client.collection('assets').updateOne(
                    {"_id": a},
                    {$addToSet: {"tickets": ticketID}}
                )
            }
        })
        return res.status(200).send({message: 'success!'})

    } catch (e) {
        console.log(e)
        return res.status(500).send({e: e.toString()})
    }
})

module.exports = router;