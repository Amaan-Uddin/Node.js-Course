const express = require('express')
const app = express()
const register = require('./routes/register')
const auth = require('./routes/auth')


const port = process.env.PORT || 3000

app.use(express.json())
app.use('/register',register)
app.use('/auth',auth)


app.listen(port, console.log(`server is running on port ${port}`))