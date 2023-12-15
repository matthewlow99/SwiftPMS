const express = require('express')
const router = express.Router()
const db = require('../../db/db_connect')
const {getCurrentDate} = require("../../helpers/dateFunctions");

router.post('/list', async (req, res) => {
    const {tenantID} = res.locals.user;
    const list = await db.databaseQuery(async (client) => {
        return await client.collection('projects').aggregate([
            {$match: {'tenantID': tenantID}},
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
})

router.post('/new', async (req, res) => {
    try {

        const {tenantID} = res.locals.user;
        const projectName = req.body.name;
        const projectType = req.body.type;
        const customerID = db.objectID(req.body.customerID);
        const notes = [];
        const assets = [];
        const tickets = [];
        const isOpen = true;
        const dateCreated = getCurrentDate()
        const status = 'New';

        const body = {
            projectName,
            projectType,
            customerID,
            isOpen,
            tenantID,
            dateCreated,
            status,
            notes,
            assets,
            tickets,
        }

        const objID = await db.databaseQuery(async (client) => {
            const {insertedId} = await client.collection('projects').insertOne(body)
            await client.collection('customers').updateOne(
                {"_id": customerID},
                {$push: {"projects": insertedId}}
            )
            return insertedId;
        })
        return res.status(200).send(objID)
    } catch (e) {
        console.log(e)
        return res.status(500).send({e: e.toString()})
    }
})

router.post('/fetch', async (req, res) => {
    try {
        const {tenantID} = res.locals.user;
        const projectID = db.objectID(req.body.projectID)
        const project = await db.databaseQuery(async (client) => {
            return await client.collection('projects').aggregate([
                {$match: {"_id": projectID}},
                {$match: {'tenantID': tenantID}},
                {
                    $lookup: {
                        from: 'tickets',
                        localField: 'tickets',
                        foreignField: '_id',
                        as: 'tickets'
                    }
                },
                {
                    $lookup: {
                        from: 'project_notes',
                        localField: 'notes',
                        foreignField: '_id',
                        as: 'notes'
                    }
                },
            ]).toArray()
        })
        return res.status(200).send(project[0])
    } catch (e) {
        console.log(e)
        return res.status(500).send(e)
    }
})

router.post('/add_note', async (req, res) => {
    const projectID = db.objectID(req.body.projectID);
    const note = req.body.note;
    const authorName = 'Matthew Low'
    const date = getCurrentDate();

    const body = {note, authorName, date}

    const {insertedId} = await db.databaseQuery(async (client) =>{
        return await client.collection('project_notes').insertOne(body)
    })
    const obj = await db.databaseQuery(async (client) => {
        return await client.collection('projects').updateOne(
            {"_id": projectID},
            {$push: {"notes": insertedId}}
        )
    })

    return res.status(200).send(obj)
})
module.exports = router