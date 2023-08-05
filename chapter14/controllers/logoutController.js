const User = require('../model/User')

const handleLogout = async (req,res) => {
    if(!req.cookies?.refresh) { return res.sendStatus(204) }
    const refreshToken = req.cookies.refresh
    try {
        await User.updateOne({ refreshToken:refreshToken },{ $unset: {refreshToken:1}}).exec()
        res.clearCookie('refresh',{ httpOnly: true })
        res.clearCookie('access',{ httpOnly: true })
        res.sendStatus(200)    
    } catch (error) {
        res.sendStatus(500)
    }
}

module.exports = handleLogout