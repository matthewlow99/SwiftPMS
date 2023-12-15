const express = require('express')
const app = express()
const cors = require('cors')
const env = require('dotenv')
const path = require('path')

env.config()
app.use(cors({
    method: ['GET', 'POST'],
    origin: '*'
}))
app.use(express.json())
app.use(express.static(path.join(__dirname, '../client/build')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

const router = require('./routes/apiRouter')

app.use('/', router)

app.listen(3050, () => {console.log('connected')})
