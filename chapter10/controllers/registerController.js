const userDB = {
    users: require('../model/users.json'),
    setUsers: function(data) { this.users = data }
}
const fsPromises = require('fs').promises
const path = require('path')
const bcrypt = require('bcrypt')

const getAllUsers = (req,res) => {
    res.json(userDB.users)
}

const handleNewUser = async (req,res) => {
   // deconstruct/unpack the req.body
    const { user , password } = req.body
    if(!user || !password){
        return res.status(400).json({ "message":"user and password are required" })
    }
    // check if user already exists
    const duplicateUser = userDB.users.find(person => person.user === user)
    if(duplicateUser){
        return res.sendStatus(409)
    }
    try{
        // if user does not exist add the new user to the database
        const encrypPwd = await bcrypt.hash(password,10)
        const newUser = { "user":user , "password":encrypPwd }
        userDB.setUsers([...userDB.users,newUser])
        await fsPromises.writeFile(path.join(__dirname,'..','model','users.json'),JSON.stringify(userDB.users)) 
        res.status(201).json({ "message":`new user ${user} created` })
    } catch (err){
        res.status(500).json({ "message":"Issue from server side." })
    }
}

module.exports = { handleNewUser,getAllUsers }