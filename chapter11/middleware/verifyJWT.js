const jwt = require('jsonwebtoken')
require('dotenv').config

// create a middleware to verify the JWT 
const verifyJWT = (req,res,next) => {
    const authHeader = req.headers['authorization']
    if(!authHeader){ return res.sendStatus(401) }
    console.log(authHeader) // Bearer <token>
    // get the token
    const token = authHeader.split(" ")[1]
    jwt.verify( // verify the given token with the secret token to get a decoded token
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err , decoded) => {
            if(err) res.sendStatus(403) // forbidden
            req.user = decoded.user
            next()
        }

    )
}

module.exports = verifyJWT
// now add this middleware to the routes which you would like to protect