const userDB = {
    users: require('../model/users.json'),
    setUsers: function(data) {this.users = data}
}
const jwt = require('jsonwebtoken')
require('dotenv').config() // loads .env file content into process.env


const handleRefreshToken = (req,res) => {
    // get the cookie
    const cookies = req.cookies
    if(!cookies?.jwt){ res.sendStatus(401) } // unauthorized
    console.log(cookies.jwt)
    const refreshToken = cookies.jwt
    const findUser = userDB.users.find(person => person.refreshToken === refreshToken)
    if(!findUser){ res.sendStatus(403) } // forbidden
    // verify the refresh token using the REFRESH_TOKEN_SECRET
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err,decode) => {
            if(err || findUser.user !== decode.user){
                res.sendStatus(403)
            }
            // create a accessToken
            const accessToken = jwt.sign(
                { "user": findUser.name },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: "35s" }
            )
            res.cookie('access',accessToken,{ httpOnly:true, maxAge: 70000})
            res.json({ accessToken })
        }
    )
}


module.exports = handleRefreshToken