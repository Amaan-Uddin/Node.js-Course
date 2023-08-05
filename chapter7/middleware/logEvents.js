const { format } = require('date-fns')
const { v4:uuid } = require('uuid')
const path = require('path')
const fs = require('fs')
const fsPromises = require('fs').promises

const logEvents = async (message,fileName) => {
    const dateTime = `${format(new Date(),'yyyyMMdd\tHH:mm:ss')}`
    const logMessage = `${dateTime}\t${uuid()}\t${message}\n`
    try{
        if(!fs.existsSync(path.join(__dirname,'..','logs'))){
            await fsPromises.mkdir(path.join(__dirname,'..','logs'))
        }
        await fsPromises.appendFile(path.join(__dirname,'..','logs',fileName),`${logMessage}`)
    } catch(err){
        console.log(err)
    }
}

const logger = (req,res,next) => {
    logEvents(`${req.method}\t${req.headers.origin}\t${req.url}`,'reqLog.txt')
    console.log(`${req.method}\t${req.path}`)
    next()// is necessary, passes the control to the next middleware function 
}

module.exports = { logger,logEvents }
