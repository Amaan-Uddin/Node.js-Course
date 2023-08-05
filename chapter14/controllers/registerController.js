// instead of writing a new user to the json file, we are going to direct the new user's info to mongodb
const User = require('../model/User')
const bcrypt = require('bcrypt') 
const mongoose = require('mongoose')

const handleNewUser = async (req,res) => {
    const { user,pwd } = req.body
    if(!user||!pwd){ return res.sendStatus(400) }

    // check for duplicates
    const duplicate = await User.findOne({ username:user }).exec()
    // the .exec function returns a 'Promise' instead of a 'thenable'
    // mongoose queries return a thenable but using .exec returns a Promise and we can give a callback inside of .exec(callback)

    if(duplicate){ return res.sendStatus(409) }

    try {
        const hashPwd = await bcrypt.hash(pwd,10)

        // create and store new user
        const result = await User.create({
            "username": user,
            "password": hashPwd
        })

        console.log(result)

        res.status(201).json({ Successful:`new user ${user} has been added to ${mongoose.connection.name}` })
        res.end()
    } catch (error) {
        res.sendStatus(500).json({serverError: error})
    }
}

module.exports = handleNewUser