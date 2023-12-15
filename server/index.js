const express = require('express')
const app = express()
const cors = require('cors')
const env = require('dotenv')

env.config()
app.use(cors({
    method: ['GET', 'POST'],
    origin: '*'
}))
app.use(express.json())

const router = require('./routes/apiRouter')
app.use('/', router)

app.listen(3050, () => {console.log('connected')})
