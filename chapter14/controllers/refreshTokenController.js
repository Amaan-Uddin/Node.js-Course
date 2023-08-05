const User = require('../model/User')
const jwt = require('jsonwebtoken')

const handleRefreshToken = async (req,res) => {
    const cookie = req.cookies
    if(!cookie?.refresh){ return res.sendStatus(401) }
    const refreshToken = cookie.refresh
    const findUser = await User.findOne({ refreshToken:refreshToken }).exec()
    if(!findUser){ return res.sendStatus(401) }
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err,decode) => {
            if(err || findUser.username !== decode.username){ res.sendStatus(403) }

            // once the refreshToken has been verified and we made sure that the token belongs to the specifc user
            // who has been decoded we proceed to create the accessToken
            const roles = Object.values(findUser.roles)
            const accessToken = jwt.sign(
                { "userInfo":{
                        "username": findUser.username,
                        "roles": roles
                    } 
                },
                process.env.ACCESS_TOKEN_SECRET,
                { "expiresIn": "45s" }
            )

            res.cookie('access',accessToken,{ httpOnly:true, maxAge: 45*1000 })
            res.status(200).json({ Successful:`Access Token has been generated. Expires in 45s`}) // make sure to send a response status 
            res.end()
        }
    )
}

module.exports = handleRefreshToken