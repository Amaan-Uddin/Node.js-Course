const { logger } = require('./middleware/logEvents')
const errorHandler = require('./middleware/errorHandler')
const express = require('express')
const app = express()
const path = require('path')
const cors = require('cors')
const PORT = process.env.PORT || 3500

// all middleware are to be declared before the request handling

const whitelist = ['https://www.google.com']
const corsOption = {
    origin: (origin,callback) => {
        if(whitelist.indexOf(origin) !== -1 || !origin){
            // we must remove the !origin after developement 
            // it must be present during production otherwise it can cause an error
            callback(null,true)
            //   no-error, origin allowed
        } else{
            callback(new Error('not allowed by CORS'))
        }
    },
    optionsSuccessStatus : 200,
}

// create a custom middleware
app.use(logger)

app.use(cors(corsOption))

app.get('/data',(req,res) => {
    res.json({name:'amaan',age:'20'})
})

// to handle url encoded data or form data that is submited by client we use express.urlencoded() middleware fuction
// conten-type: application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }))

// if json data is submitted as the parameter we need to get that data out of submission
app.use(express.json())

// serve static files
app.use(express.static('public')) 


// these middleware are applied to all routes
app.get('^/$|/index(.html)?',(req,res) => {
    res.sendFile(path.join(__dirname,'views','index.html'))
})

app.get('/new-page(.html)?',(req,res) => {
    res.sendFile(path.join(__dirname,'views','new-page.html'))
})

app.get('/old-page(.html)?',(req,res) => {
    res.redirect(301,'views/new-page.html')
})

// GET for 404 not found 
app.get('/*',(req,res) => {
    res.status(404).sendFile(path.join(__dirname,'views','404.html'))
})

// let's create a error handler in express
// REMEMBER: express already has a built in error handler, we are creating a custom error handler to log the errors
app.use(errorHandler)

app.listen(PORT,() => {
    console.log(`Server running on port ${PORT}`)
})