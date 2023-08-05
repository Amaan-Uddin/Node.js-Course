const User = require('../model/User')
const jwt = require('jsonwebtoken')

// verify roles has a set paramater and checks if the roles passed by the accessToken in the request header is accepted or not
const verifyRoles = (...allowedRoles) => {
    return (req,res,next) => {
        if(!req?.roles){ return res.sendStatus(401) }
        const Roles = [...allowedRoles]
        const userRoles = req.roles
        const mapArray = userRoles.map((roles) => Roles.includes(roles)) // returns an array of either true/false
        const checkMap = mapArray.find((check) => check === true) // returns an array that has only truth values
        if(!checkMap){ return res.sendStatus(403) }
        next()
    }
}

module.exports = verifyRoles
