require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const connectDB = require('./config/dbConn')
const cookieParser = require('cookie-parser')

const registerRouter = require('./routes/register')
const authorizeRouter = require('./routes/authorize')
const refreshRouter = require('./routes/refresh')
const logoutRouter = require('./routes/logout')
const verifyJWT = require('./middleware/verifyJWT')
const employeeRouter = require('./routes/api/employees')

const port = process.env.PORT || 3500

connectDB()

app.use(express.json()) // parse the json data given and move it to the request body
app.use(cookieParser())

app.use('/register',registerRouter)
app.use('/authorize',authorizeRouter)
app.use('/refresh',refreshRouter)
app.use('/logout',logoutRouter)
app.use(verifyJWT)
app.use('/employee',employeeRouter)

mongoose.connection.once('open', () => {
    console.log('succesfully connected to DB')
    app.listen(port,console.log(`Server running on port ${port}`))
})       