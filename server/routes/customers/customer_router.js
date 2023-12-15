const express = require('express')
const router = express.Router()
const db = require('../../db/db_connect')
const {getCurrentDate} = require("../../helpers/dateFunctions");

router.post('/new',  async (req, res) => {
    const name = req.body.customerName;
    const email = req.body.customerEmail;
    const phone = req.body.customerPhone;
    const color = req.body.color || '#FFFFFF'
    const {tenantID} = res.locals.user;

    const customerObject = {
        name,
        tenantID,
        email,
        phone,
        color,
        status: 'New',
        contacts: [],
        assets: [],
        projects: [],
        tickets: [],
    }

    const obj = await db.databaseQuery(async (client) => {
        return await client.collection('customers').insertOne(customerObject)
    })
    console.log(obj)
    return res.status(200).send(obj)
})
router.post('/list', async (req, res) => {

    const {tenantID} = res.locals.user;

    const customers = await db.databaseQuery(async (client) => {
        return await client.collection('customers').find({tenantID}).toArray()
    })
    return res.status(200).send(customers)
})
router.post('/add_note', async (req, res) => {
    const customerID = db.objectID(req.body.customerID);
    const note = req.body.note;
    const authorName = 'Matthew Low'
    const date = getCurrentDate();

    const body = {customerID, note, authorName, date}

    const {insertedId} = await db.databaseQuery(async (client) =>{
        return await client.collection('customer_notes').insertOne(body)
    })
    const obj = await db.databaseQuery(async (client) => {
        return await client.collection('customers').updateOne(
            {"_id": customerID},
            {$push: {"notes": insertedId}}
        )
    })

    return res.status(200).send(obj)
})
router.post('/fetch', async (req, res) => {
    try {
        const {tenantID} = res.locals.user;
        const id = db.objectID(req.body.customerID)
        const customer = await db.databaseQuery(async (client) => {
            return await client.collection('customers').aggregate([
                {
                  $match: {"tenantID": tenantID}
                },
                {
                    $match: {"_id": id}
                }, {
                    $lookup: {
                        from: "contacts",
                        localField: "contacts",
                        foreignField: "_id",
                        as: "contacts"
                    }
                },
                {
                    $lookup: {
                        from: "assets",
                        localField: "assets",
                        foreignField: "_id",
                        as: "assets"
                    }
                },
                {
                    $lookup: {
                        from: "projects",
                        localField: "projects",
                        foreignField: "_id",
                        as: "projects"
                    }
                },
                {
                    $lookup: {
                        from: "tickets",
                        localField: "tickets",
                        foreignField: "_id",
                        as: "tickets"
                    }
                },
                {
                    $lookup: {
                        from: "customer_notes",
                        localField: "notes",
                        foreignField: "_id",
                        as: "notes"
                    }
                }
            ]).toArray();
        })

        return res.status(200).send(customer[0])
    } catch (e) {
        res.status(500).send({})
    }
})

router.post('/assets', async (req, res) => {
    const customerID = db.objectID(req.body.customerID);
    const {tenantID} = res.locals.user;
    const list = await db.databaseQuery(async (client) => {
        return await client.collection('assets').find({customerID, tenantID}).toArray()
    })
    return res.status(200).send(list)
})
router.post('/contacts', async (req, res) => {
    const customerID = db.objectID(req.body.customerID)
    const {tenantID} = res.locals.user;
    const list = await db.databaseQuery(async (client) => {
        return await client.collection('contacts').find({customerID, tenantID}).toArray()
    })
    return res.status(200).send(list)
})

module.exports = router;