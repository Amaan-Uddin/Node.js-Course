const userDB = {
    users: require('../model/users.json'),
    setUsers: function(data) {this.users = data}
}

const fsPromises = require('fs').promises
const path = require('path')
const bcrypt = require('bcrypt')

// create a method to add new users to our DB
const handleNewUser = async (req,res) => {
    // get the user and password form the req.body
    console.log(req.body)
    const { user,password } = req.body

    // check to see if either of the fields are null, if yes then RETURN 400
    if(!user || !password){
        return res.status(400).json({ "message":"user and password cannot be empty" })
    }

    // check for duplicate user
    const duplicateUser = userDB.users.find(person => person.user === user)
    if(duplicateUser){ return res.sendStatus(409) }

    try{
        // hash the password
        const hashedPassword = await bcrypt.hash(password,10)
        //filter out our users array
        const filterdUsers = userDB.users.filter(person => person.user !== user)

        const newUser = { "user":user,"password":hashedPassword }
        userDB.setUsers([...filterdUsers,newUser])
        // write the new users array to users.json while stringifing it.
        await fsPromises.writeFile(path.join(__dirname,'..','model','users.json'),JSON.stringify(userDB.users))
        res.status(201).json({ "success":`user ${user} created` })
    } catch(err){
        res.status(500).json({ "message":err.message })
    }
}


module.exports = { handleNewUser}