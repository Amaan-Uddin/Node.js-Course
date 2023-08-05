// working with directory using Node.js file system module

const fs = require('fs')

if(!fs.existsSync('./new')){
    fs.mkdir('./new',(err) => {
        if(err) throw err;
        console.log('Directory created')
    })
}

if(fs.existsSync('./new')){
    fs.rmdir('./new',(err) => {
        if(err) throw err;
        console.log('Directory removed')
    })
}
    
process.on('uncaughtException',(err) => {
    console.error(`ERROR: ${err}`)
    process.exit(1)
})