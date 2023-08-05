// create a router for our subdir in our views folder
const express = require('express')
const router = express.Router()
const path = require('path')

router.get('^/$|/index(.htmls)?',(req,res) => {
    res.sendFile(path.join(__dirname,'..','views','subdir','index.html'))
})

module.exports = router