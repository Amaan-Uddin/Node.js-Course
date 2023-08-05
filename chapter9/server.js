const express = require('express')
const app = express()
const path = require('path')
const root = require('./routes/root')
const employees = require('./routes/api/employees')
const notFound404 = require('./routes/404')
const subdir = require('./routes/subdir')
const port = process.env.PORT || 3000

app.use(express.json()) // will read the JSON body of the request, parse it and put it in req.body

// static files
app.use('/',express.static(path.join(__dirname,'public')))
app.use('/subdir',express.static(path.join(__dirname,'public')))

// all routers
app.use('/',root)
app.use('/subdir',subdir)
app.use('/employees',employees)

// 404 not found router
app.use(notFound404)

app.listen(port,console.log(`server is running on port ${port}`))