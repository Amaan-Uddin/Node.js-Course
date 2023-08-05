const userDB = {
    users: require('../model/users.json'),
    setUsers: function(data) { this.users = data }
}
const bcrypt = require('bcrypt')

const authorizeUser = async (req,res) => {
    const { user,password } = req.body
    if(!user || !password){
        return res.status(400).json({"message":"user and password required"})
    }
    const foundUser = userDB.users.find(person => person.user === user)
    if(!foundUser) return res.sendStatus(401) // unauthorized
    const match = await bcrypt.compare(password,foundUser.password)
    if(match){
        res.json({ "success":`User ${user} authorized` })
    } else{
        res.sendStatus(401)
    }
}

const getPassword = async (req,res) => {
    const user = req.body.user
    if(!user){
        return res.status(400).json({ "message":"user required!" })
    }
    const findUser = userDB.users.find(person => person.user === user)
    if(!findUser){
        res.sendStatus(401)
    }
    const userPassword = findUser.password
    if(userPassword){
        res.json({ "password":`${userPassword}` })
    } else{
        res.sendStatus(401)
    }
}

module.exports = { authorizeUser,getPassword }