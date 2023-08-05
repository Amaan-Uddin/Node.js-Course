const express = require('express')
const app = express()
const authRouter = require('./routes/authorize')
const registerRouter = require('./routes/register')
const refreshRouter = require('./routes/refresh')
const logoutRouter = require('./routes/logout')
const employeesRouter = require('./routes/api/employees')
require('dotenv').config() // loads the content of .env into process.env
const cookieParser = require('cookie-parser')

const port = process.env.PORT || 3500


app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use(cookieParser())

app.use('/register',registerRouter)
app.use('/authorize',authRouter)
app.use('/refresh',refreshRouter)
app.use('/logout',logoutRouter)
app.use('/employee',employeesRouter)

app.listen(port,console.log(`Server is running on port ${port}`))