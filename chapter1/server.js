// key points to remember:
// 1) Node runs on the server(backend) - not on the browser(frontend)
// 2) we use the terminal window as our console
//    to use JS in the terminal just execute 'node' in the terminal
//    to exit Node press ctrl + c twice
// 3) we have global object here instead of window object
// console.log(global) // to view the global object 
// 4) Node has common core modules which we can use 
// commonJS modules (require()) instead of ES6 modules (import{}/export)

const os = require('os')

console.log(os.type())
console.log(os.version())
console.log(os.homedir()+"\n")

// when a JS file is executed in Node the contents of the file are executed after a function call 
// and all the contents of the file are placed inside this function
// (function (exports, require, module, __filename, __dirname){
//      contents of the file being executed in Node
// })

// let's print out the parameters of the hidden function
console.log(__dirname)
console.log(__filename)
console.log(module)
console.log(exports)
// the module object has exports object which holds all the variable/functions ready to be exported

// another commonJS module is 'path', and we use it to get the path of a __filename , like
// path.dirame()
// path.basename()
// path.extname()
// another cool and useful funtion is the path.parse() function which returns an object of the root,path,dirname,filename,ext etc

const path = require('path')
console.log(path.parse(__filename))
