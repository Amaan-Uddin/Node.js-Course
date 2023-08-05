require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const connectDB = require('./config/dbConn')

const port = process.env.PORT || 3500

// connect to MonogoDB
connectDB()


app.use(express.urlencoded({ extended: false }))
app.use(express.json())


// we dont want to listen to a port is our DB does not connect 
mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB')
    app.listen(port,console.log(`Server is running on port ${port}`))
})