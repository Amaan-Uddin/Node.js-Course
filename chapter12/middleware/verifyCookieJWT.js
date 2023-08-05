const jwt = require('jsonwebtoken')
require('dotenv').config()

// we are sending the access token created by our refersh token to our cookie,
// from there we can easily access the accessToken without the need of the authorization tab in the req.headers
// and we won't need to manually insert the accessToken each time to access authorized data

const verifyCookieJWT = (req,res,next) => {
    const cookie = req.cookies
    if(!cookie?.access){ return res.sendStatus(401) }
    const accessToken = cookie.access
    jwt.verify(
        accessToken,
        process.env.ACCESS_TOKEN_SECRET,
        (err , decode) => {
            if(err) return res.sendStatus(403)
            req.user = decode.userInfo.user
            req.roles = decode.userInfo.roles
            next()
        }
    )
}

module.exports = verifyCookieJWT
