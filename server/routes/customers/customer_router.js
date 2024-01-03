const express = require('express')
const router = express.Router()
const db = require('../../db/db_connect')
const {getCurrentDate} = require("../../helpers/dateFunctions");
const dataRouter = require('./customer_data_router')


router.use('/fetch', dataRouter)

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
    }

    const obj = await db.databaseQuery(async (client) => {
        return await client.collection('customers').insertOne(customerObject)
    })
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
    const customerID = db.objectID(req.body.id);
    const note = req.body.note;
    const authorName = res.locals.user.firstName + ' ' + res.locals.user.lastName
    const date = getCurrentDate();
    const body = {customerID, note, authorName, date}

    const {insertedId} = await db.databaseQuery(async (client) =>{
        return await client.collection('customer_notes').insertOne(body)
    })

    return res.status(200).send({message: 'post successful'})
})


module.exports = router;