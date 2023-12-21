const express = require('express')
const router = express.Router();
const db = require('../../db/db_connect')
const {generateTokens} = require("../../helpers/tokenFunctions");


router.post('/get_invites', async (req, res) => {
    try{
        const {userID} = res.locals.user;

        const list = await db.databaseQuery(async (client) => {
            return await client.collection('pendingInvites').find({invited: userID}).toArray()
        })
        return res.status(200).send(list)
    } catch (e) {
        console.log(e)
        return res.status(500).send({})
    }

})


module.exports = router;