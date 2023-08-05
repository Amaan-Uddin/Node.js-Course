const fs = require('fs')
const fsPromises = require('fs').promises
const path = require('path')

const logEvent = async (message,fileName) => {
    try{
        if(!fs.existsSync(path.join(__dirname,'..','logs'))){
            await fsPromises.mkdir(path.join(__dirname,'..','logs'))
        }
        await fsPromises.appendFile(path.join(__dirname,'..','logs',fileName),`${message}\n`)
    } catch(err){
        console.log(err)
    }
}

const logger = (req,res,next) => {
    logEvent(`${req.method}\t${req.url}\t${req.headers.origin}`,'reqLogs.txt')
    console.log(`${req.method}\t${req.path}`)
    next()
}

module.exports = logger