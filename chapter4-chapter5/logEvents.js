// import all the necessary function from our installed packages
const { format } = require('date-fns')
const { v4: uuid } = require('uuid')

// import some common-core modules
const fs = require('fs') 
const fsPromises = require('fs').promises // to initiate async fucntions and work with files asynchronously
const path = require('path')

// create the logEvents function
const logEvent = async (message,logFile) => {
    // get the date and time using Date() class and format it
    const dateTime = `${format(new Date(),'yyyyMMdd\tHH:mm:ss')}`
    const logMessage = `${dateTime}\t${uuid()}\t${message}`
    console.log(`${logMessage}`)
    try{
        // check if the log_folder exists or not
        if(!fs.existsSync('./logs')){
            await fsPromises.mkdir('./logs')
        }
        await fsPromises.appendFile(path.join(__dirname,'logs',logFile),`${logMessage}\n`)
    } catch (err){
        console.error(err)
    }
}

// export our function to be used within the scope of our current directory
module.exports = logEvent