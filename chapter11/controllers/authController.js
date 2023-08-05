const userDB = {
    users: require('../model/users.json'),
    setUsers: function(data) {this.users = data}
}
const bcrypt = require('bcrypt')
const { access } = require('fs')
const jwt = require('jsonwebtoken')
require('dotenv').config() // loads .env file content into process.env
const fsPromises = require('fs').promises
const path = require('path')


const authorizeUser = async (req,res) => {
    const { user,password } = req.body
    if(!user || !password){
        return res.status(400).json({ "message":"user and password are required." })
    }
    // authenticate the user
    const foundUser = findUser(userDB.users,user)
    if(!foundUser){
        return res.sendStatus(401) // unauthorized
    }
    const match = await bcrypt.compare(password,foundUser.password)
    if(match){
        // create JWTs
        const accessToken = jwt.sign(
            { "user":foundUser.user }, // payload
            process.env.ACCESS_TOKEN_SECRET, // secret key
            { expiresIn: '35s' } // payload for exp time
        )
        const refreshToken = jwt.sign(
            { "user":foundUser.user },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '40s' }
        )
        // saving refresh token with current user
        const otherUsers = userDB.users.filter(person => person.user !== foundUser.user)
        const currentUser = { ...foundUser,refreshToken }
        userDB.setUsers([...otherUsers,currentUser])
        await fsPromises.writeFile(path.join(__dirname,'..','model','users.json'),JSON.stringify(userDB.users))

        res.cookie('jwt',refreshToken,{ httpOnly: true, maxAge: 70000 })
        res.json({ accessToken }) // send this to the frontend
        // res.json({ "success":`user ${user} authorized` })
    }else{
        res.sendStatus(401)
    }
}

const getAllUsers = (req,res) => {
    console.log(userDB.users)
    res.json(userDB.users)
}

const getUser = (req,res) => {
    const user = req.params.user // since the URL holds the 'user' (eg: ../amaan)
    if(!user){
        return res.status(400).json({ "message":"user is required." })
    }
    const foundUser = findUser(userDB.users,user)
    if(foundUser){
        console.log(foundUser)
        res.json(foundUser)
    }else{
        res.status(500).json({ "message":"user does not exist" })
    }
}

const findUser = (database,user) => {
    const foundUser = database.find(person => person.user === user)
    if(foundUser){
        return foundUser
    }else{
        return undefined
    }
}

module.exports = { authorizeUser,getAllUsers,getUser }