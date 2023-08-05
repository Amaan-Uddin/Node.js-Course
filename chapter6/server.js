const express = require('express')
const app = express()
const path = require('path')

const PORT = process.env.PORT || 3500

// start with routing
// app.<req_method>(<route>/<URL>,<handlers (req,res)>)

app.get('^/$|/index(.html)?',(req,res) => {
    // res.sendFile('./views/index.html',{ root: __dirname }) this is one way 
    res.sendFile(path.join(__dirname,'views','index.html'))
})

// create a GET request to new-page but making .html optional in the route/URL
app.get('/new-page(.html)?',(req,res) => {
    res.sendFile(path.join(__dirname,'views','new-page.html'))
})

// create a redirect with a status code 301
// usually a redirect in express gives statusCode 302 by default which is not a permenant redrirect
// and a normal response is 200
app.get('/old-page(.html)?',(req,res) => {
    res.redirect(301,'/new-page.html')
})


// send a message to client on a specific route on a GET call, use multiple route handlers
app.get('/multiple-handlers(.html)?',(req,res,next) => {
    console.log('attempting multiple handler request')
    next()
},(req,res) => {
    res.send('succesfully chained multiple handlers')
})

// create GET call to 404 request
// here the route is '/*' meaning everything
app.get('/*',(req,res) => {
    res.status(404).sendFile(path.join(__dirname,'views','404.html')) 
    // we need to specify status or it will be a 200
})


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})