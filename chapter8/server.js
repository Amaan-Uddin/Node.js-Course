const express = require('express')
const app = express()
const path = require('path')

//routers
const subdir = require('./routes/subdir')
const root = require('./routes/root')
const employees = require('./routes/api/employees')

const port = process.env.PORT || 4000

// static files
app.use('/',express.static(path.join(__dirname,'public'))) // use static files on the root
app.use('/subdir',express.static(path.join(__dirname,'public'))) // use static files inside subdir


app.use('/subdir',subdir) // for the subdir route use the subdir router
app.use('/',root)
app.use('/employees',employees)

app.all('*',(req,res) => {
    res.status(404)
    if(req.accepts('.html')) // .accepts() check whether the given content-type is accepted by the request maker
    {
        res.sendFile(path.join(__dirname,'views','404.html'))
    } else{
        res.type('txt').send('404 Not Found')
    }
})

app.listen(port, console.log(`Server is running on port ${port}`))