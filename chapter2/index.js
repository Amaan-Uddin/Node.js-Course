// import the file system module 
const fs = require('fs')
const path = require('path')

// read a file using readFile(<path/fileDestination>,callback: function(error,data))
// fs.readFile('./files/starter.txt', (err,data) => {
//     if(err) throw err;
//     console.log(data.toString())  make sure to convert the data to its appropriate trype or else we get a Buffer data
//     <Buffer 48 69 20 6d 79 20 6e 61 6d 65 20 69 73 20 41 6d 61 ... 97 more bytes>
// })


// we can also give a utf8 encoding inside the readFile() as a parameter , this allows for the data to be decoded 
// from Buffer stream to string type which we can read
fs.readFile(path.join(__dirname,'files','starter.txt'), 'utf8' ,(err,data) => { 
    if(err) throw err;
    console.log(data)
})


console.log('Hello world...')
// all Node functions and Node in general is asynchronous, meaning that the readFile() will although be the first
// to get executed in the runtime, but it wont log the info from the starter.txt file yet.
// as the thread that carry out the process in Node will respond to one function and immediately move to the other
// statement in the runtime.


// if there arieses an error JS would throw the err in our runtime and we have to catch it
process.on('uncaughtException',(err) => {
    console.error(`There seems to be an error ${err}`)
    process.exit(1)
})
// process object is a global object which needs not to be imported and is available.
// the process object interracts with the current Node process and calls a functions