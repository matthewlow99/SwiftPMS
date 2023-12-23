const express = require('express')
const app = express()
const router = express.Router()
const db = require('../db/db_connect')
const jwt = require('jsonwebtoken')

const customerRouter = require('./customers/customer_router')
const assetRouter = require('./assets/asset_router')
const projectRouter = require('./projects/project_router')
const ticketRouter = require('./tickets/ticket_router')
const contactRouter = require('./contacts/contact_router')
const tenantRouter = require('./company/tenant_router')
const userRouter = require('./company/user_router')
const loginRouter = require('./login/login_router')
const endpointRouter = require('./endpoints/endpoint_router')

const {TokenExpiredError} = require("jsonwebtoken");

app.use('/pub', loginRouter)

app.use((req, res, next) => {
    const accessToken = req.headers.authorization;

    return jwt.verify(accessToken, process.env.ACCESS_KEY, (err, decoded) => {
        if(err){
            if(err.name === 'TokenExpiredError')
                return res.status(401).send({message: 'Token expired'})
            return res.status(500).send({error: err})
        } else {
            res.locals.user = decoded;
            res.locals.user.tenantID = db.objectID(res.locals.user.tenantID);
            next();
        }
    })
})

app.use('/customer', customerRouter)
app.use('/asset', assetRouter)
app.use('/project', projectRouter)
app.use('/ticket', ticketRouter)
app.use('/contact', contactRouter)
app.use('/tenant', tenantRouter)
app.use('/user', userRouter)
app.use('/endpoint', endpointRouter)

module.exports = app;