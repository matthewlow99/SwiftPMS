const express = require('express')
const router = express.Router();
const db = require('../../db/db_connect')
const {generateTokens, hashString} = require("../../helpers/tokenFunctions");
const jwt = require('jsonwebtoken')

router.post('/create_account', isEmailUnique, async (req, res) => {
    try{
        const {email, password, company, firstName, lastName} = req.body;

        await db.databaseQuery(async (client) => {
            if(company){
                const {insertedId} = await client.collection('tenants').insertOne({company, firstName, lastName, email})
                await client.collection('users').insertOne({firstName, lastName, email, password: hashString(password), tenantID: insertedId})
            } else {
                const {insertedId} = await client.collection('users').insertOne({firstName, lastName, email, password: hashString(password), tenantID: ""})
                await client.collection('users').updateOne({"_id": insertedId}, { $set: { tenantID: insertedId }})
            }
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
        const users = await client.collection('users').find({email, password: hashString(password)}).toArray()
        if(users.length === 0){ return res.status(201).send({message: 'Invalid Credentials'}) }
        else {
            const {_id} = users[0];
            const tokens = await generateTokens(_id)
            return res.status(200).send(tokens)
        }
    })
})
router.post('/refresh_token', async (req, res) => {
    try {
        const {refreshToken} = req.body;
        const userID = db.objectID(jwt.decode(refreshToken).userID);
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
        return res.status(500).send({error: 'Token invalid'});
    }
})
router.post('/verify_token', async (req, res) => {
    const {accessToken} = req.body;
    return jwt.verify(accessToken, process.env.ACCESS_KEY, (err) => {
        try{
            if(err){
                if(err?.name === 'TokenExpiredError'){
                    return res.status(401).send({message: 'Token Expired'})
                }
                else {
                    return res.status(500).send({message: 'Token Invalid'})
                }
            }
            return res.status(200).send({message: 'Token Valid'})
        } catch (e) {
            return res.status(500).send({message: 'Token Invalid'})
        }

    })
})
async function isEmailUnique(req, res, next){
    try {
        const {email} = req.body;
        return await db.databaseQuery(async (client) => {
            const users = await client.collection('users').find({email}).toArray()
            if(users.length === 0)
                next();
            else
                return res.status(403).send({message: 'Email Already Taken'})
        })
    } catch (e) {
        return res.status(500).send({message: 'Server Error'})
    }
}


module.exports = router;