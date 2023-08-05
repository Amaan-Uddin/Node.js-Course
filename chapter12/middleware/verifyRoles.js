const verifyRoles = (...allowedRoles) => {
    return (req,res,next) => {
        if(!req?.roles){ return res.sendStatus(401) }
        const rolesArray = [...allowedRoles]
        console.log(rolesArray) // roles that are required to perform the action
        console.log(req.roles) // roles of the user
        const result = req.roles.map(role => rolesArray.includes(role)).find(check => check === true)
        if(!result){
            return res.sendStatus(401)
        }
        next()
    }
}

module.exports = verifyRoles