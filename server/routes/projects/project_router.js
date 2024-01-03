const express = require('express')
const router = express.Router()
const db = require('../../db/db_connect')
const {getCurrentDate} = require("../../helpers/dateFunctions");
const dataRouter = require('./project_data_router')

router.use('/fetch', dataRouter)

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
            },
            {
                $unwind: "$customer"
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
            status
        }

        const objID = await db.databaseQuery(async (client) => {
            const {insertedId} = await client.collection('projects').insertOne(body)
            return insertedId;
        })
        return res.status(200).send(objID)
    } catch (e) {
        console.log(e)
        return res.status(500).send({e: e.toString()})
    }
})
router.post('/add_note', async (req, res) => {
    const projectID = db.objectID(req.body.projectID);
    const note = req.body.note;
    const authorName = 'Matthew Low'
    const date = getCurrentDate();
    const body = {note, authorName, date, projectID}

    const {insertedId} = await db.databaseQuery(async (client) =>{
        return await client.collection('project_notes').insertOne(body)
    })
    return res.status(200).send({insertedId})
})
module.exports = router