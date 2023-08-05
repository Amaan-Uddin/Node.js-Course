// using file system module with promises to use async/await and avoiding callback hell

const fsPromises = require('fs').promises
const path = require('path')

// create an async function to log the data from starter file and delete it
// then create a new starter file and write to it whilst appending it and changing the name asynchrounesly

const fsOps = async () => {
    try{    
        const data = await fsPromises.readFile(path.join(__dirname,'files','starter.txt'),'utf8')
        console.log(data)
        await fsPromises.unlink(path.join(__dirname,'files','starter.txt'))
        await fsPromises.writeFile(path.join(__dirname,'files','promiseWrite.txt'), data)
        await fsPromises.appendFile(path.join(__dirname,'files','promiseWrite.txt'), '\n\nNice to meet you.')
        await fsPromises.rename(path.join(__dirname,'files','promiseWrite.txt'),path.join(__dirname,'files','promiseComplete.txt'))
        const newData = await fsPromises.readFile(path.join(__dirname,'files','promiseComplete.txt'),'utf8')
        console.log(`\n\n${newData}`)
    } catch (err) {
        console.error(err)
    }
}

fsOps()