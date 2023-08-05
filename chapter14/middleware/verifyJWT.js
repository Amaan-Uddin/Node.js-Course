const jwt = require('jsonwebtoken')

const verifyJWT = async (req,res,next) => {
    // get the cookies from the request header
    const cookie = req.cookies
    if(!cookie?.access){ return res.sendStatus(401) }
    // retrive the accessToken from cookie
    const accessToken = cookie.access
    jwt.verify(
        accessToken,
        process.env.ACCESS_TOKEN_SECRET,
        (err,decode) => {
            if(err) { return res.sendStatus(403) }
            req.username = decode.userInfo.username
            req.roles = decode.userInfo.roles
            next()
        }
    )
}

module.exports = verifyJWT