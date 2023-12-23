const express = require('express')
const router = express.Router();

router.post('/test', (req, res) => {
    return res.send('hello!')
})

module.exports = router;