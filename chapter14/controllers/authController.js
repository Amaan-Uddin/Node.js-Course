const User = require('../model/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')

const authUser = async (req,res) => {
    const { user,pwd } = req.body
    if(!user || !pwd){ return res.sendStatus(400) }

    // find if user exist
    const findUser = await User.findOne({ username:user }).exec() // return a Promise
    if(!findUser){ return res.sendStatus(409) }
    try {
        
        const confirmPwd = await bcrypt.compare(pwd,findUser.password)
        if(!confirmPwd){ return res.sendStatus(403) }

        // create an accessToken and pass it as a cookie in response to emulate a user log-in
        const roles = Object.values(findUser.roles)

        const accessToken = jwt.sign(
            {
                "userInfo": {
                    "username": findUser.username,
                    "roles": roles
                }
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "45s" }
        )

        // create a accessToken and a refreshToken
        const refreshToken = jwt.sign(
            { "username": findUser.username },
            process.env.REFRESH_TOKEN_SECRET,
            { "expiresIn": "5m" }
        )

        await User.updateOne({ username:user },{ refreshToken:refreshToken }).exec()

        res.cookie('refresh',refreshToken,{ httpOnly: true, maxAge: 10*60*1000 })
        res.cookie('access',accessToken,{ httpOnly: true, maxAge: 45 * 1000 })
        res.status(200).json({ Successful:`User ${findUser.username} verified, refresh token generated` })
        res.end()
    } catch (error) {
        res.sendStatus(500)
    }
}

module.exports = authUser