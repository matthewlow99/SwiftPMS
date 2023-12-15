const jwt = require('jsonwebtoken')
const db = require('../db/db_connect')

async function generateTokens(userID){
    let accessToken = "";
    let refreshToken = "";
    await db.databaseQuery(async (client) => {
        const user = await client.collection('users').find({_id: userID}).toArray()
        const payload = {
            userID: user[0]._id,
            tenantID: user[0].tenantID,
            email: user[0].email,
            firstName: user[0].firstName,
            lastName: user[0].lastName
        }
        accessToken = jwt.sign(payload, process.env.ACCESS_KEY, {expiresIn: '10m'})
        refreshToken = jwt.sign({userID: user[0]._id}, process.env.ACCESS_KEY, {expiresIn: '7d'})

        await client.collection('refreshTokens').updateOne({userID: user[0]._id}, {$set: {refreshToken}}, {upsert: true})
    })

    return {accessToken, refreshToken};
}


module.exports = {generateTokens}