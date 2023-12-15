const express = require('express')
const router = express.Router();
const db = require('../../db/db_connect')
const {generateTokens} = require("../../helpers/tokenFunctions");
const jwt = require('jsonwebtoken')

router.post('/create_account', async (req, res) => {
    try{
        const {email, password, company, firstName, lastName} = req.body;

        await db.databaseQuery(async (client) => {
            const {insertedId} = await client.collection('tenants').insertOne({company, firstName, lastName, email})

            await client.collection('users').insertOne({firstName, lastName, email, password, tenantID: insertedId})
        })
        return res.status(200).send({message: 'success'})
    } catch (e) {
        console.log(e)
        return res.status(500).send({error: e.toString()})
    }
})
router.post('/login', async (req, res) => {
    const {email, password} = req.body;
    return await db.databaseQuery(async (client) => {
        const users = await client.collection('users').find({email, password}).toArray()
        if(users.length === 0){ return res.status(401).send({message: 'Invalid Credentials'}) }
        else {
            const {_id} = users[0];
            const tokens = await generateTokens(_id)
            return res.status(200).send(tokens)
        }
    })
})
router.post('/refresh_token', async (req, res) => {
    const {refreshToken} = req.body;
    const userID = db.objectID(jwt.decode(refreshToken).userID);

    try {
        const result = await db.databaseQuery(async (client) => {
            return await client.collection('refreshTokens').find({refreshToken, userID}).toArray()
        })
        if(result.length === 1){
            const tokens = await generateTokens(userID)
            return res.status(200).send(tokens)
        }
        return res.status(500).send({error: 'Token invalid'});
    }catch (e) {
        console.log(e)
    }

})



module.exports = router;