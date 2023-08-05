const userDB = {
    users: require('../model/users.json'),
    setUsers: function(data) {this.users = data}
}

const fsPromises = require('fs').promises
const path = require('path')

const handleLogout = async (req,res) => {
    const cookies = req.cookies
    if(!cookies?.jwt){ res.sendStatus(401) } // unauthorized
    const refreshToken = cookies.jwt

    const findUser = userDB.users.find(person => person.refreshToken === refreshToken)
    if(!findUser){ 
        res.clearCookie('jwt',{ httpOnly: true})
        res.clearCookie('access',{ httpOnly: true})
        return res.sendStatus(204) // complete and no content 
    }

    const otherUsers = userDB.users.filter(person => person.user !== findUser.user)
    const currentUser = {...findUser,refreshToken : ''}
    userDB.setUsers([...otherUsers,currentUser])
    try {
        await fsPromises.writeFile(path.join(__dirname,'..','model','users.json'),JSON.stringify(userDB.users))
        res.clearCookie('jwt',{ httpOnly: true })
        res.clearCookie('access')
        res.sendStatus(204)
    } catch (err) {
        res.sendStatus(500)
    }

    
}


module.exports = handleLogout