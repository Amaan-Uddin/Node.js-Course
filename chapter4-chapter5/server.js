const http = require('http')
const fs = require('fs')
const fsPromises = require('fs').promises
const path = require('path')

const logEvent = require('./logEvents')
const eventEmitter = require('events')

class MyEmitter extends eventEmitter {}
const myEmitter = new MyEmitter()

myEmitter.on('log',(message,fileName) => logEvent(message,fileName))

const PORT = process.env.PORT || 3500

const serveFile = async (filePath,contentType,response) => {
    try{
        const rawData = await fsPromises.readFile(
            filePath,
            contentType.includes('image')? '' : 'utf8'
        )
        const data = contentType === 'application/json' ? JSON.parse(rawData) : rawData
        response.writeHead(
            filePath.includes('404.html') ? 404 : 200, // changing status code for 404
            {'contentType':contentType}
        )
        response.end(
            contentType === 'application/json' ? JSON.stringify(data) : data
        ) // body of html files will be executed based on contentType specified in the response header
          // data here is the body of the files being read, html files.
    } catch(err){
        console.log(err)
        myEmitter.emit('log',`${err.name}: ${err.message}`,'reqLogs.txt')
        response.statusCode = 500 // issue from server side
        response.end()
    }
}

const server = http.createServer((req,res) => {
    console.log(req.url,req.method) //  ('/','GET') default answer
    myEmitter.emit('log',`${req.url}\t${req.method}`,'reqLogs.txt')

    // key elements, content type, filePath, 'res' (response)
    const extention = path.extname(req.url) // retrives the ext of the URL
    let contentType; // for different files we require different content type to be specified

    switch(extention){
        case '.css' : 
            contentType = 'text/css';
            break;
        case '.js' :
            contentType = 'text/javascript';
            break;
        case '.json' :
            contentType = 'application/json';
            break;
        case '.jpg' :
            contentType = 'image/jpeg';
            break;
        case '.png' :
            contentType = 'image/png';
            break;
        case '.txt' :
            contentType = 'text/plain';
            break;
        default :
            contentType = 'text/html';
            break;
    }

    // now we need to set a filePath, this way based on our content type an appropriate file will be executed
    // by the server to the browser
    let filePath = 
        contentType === 'text/html' && req.url === '/' 
            ? path.join(__dirname,'views','index.html') // when we start the server the req.url on our local host is '/'
            : contentType === 'text/html' && req.url.slice(-1) === '/'
                ? path.join(__dirname,'views',req.url,'index.html') // if the page was not the 'views' index.html then it is inside our 'subdir'
                : contentType === 'text/html'
                    ? path.join(__dirname,'views',req.url)
                    : path.join(__dirname,req.url);
    // the file path given in the browser will send a HTTP request to the server , server will send back a response
    // the client/browser will then process the response header and response body and execute the files.


    // if we forget to mention the ext name in our browser then the coresponding file will not be executed by
    // our server
    if(!extention && req.url.slice(-1) !== '/'){
        filePath += '.html' // a bypass for the above problem
    } 

    // now we serve the file which we GET/request through our browser
    const fileExist = fs.existsSync(filePath)

    if(fileExist){
        // console.log(path.parse(filePath))
        serveFile(filePath,contentType,res)
    } else {
        // console.log(path.parse(filePath))
        switch(path.parse(filePath).base){
            case 'old-page.html' : 
                    res.writeHead(301,{'Location':'/new-page.html'})
                    res.end()
                    break
            case 'www-page.html': 
                    res.writeHead(301,{'Location':'/'})
                    res.end()
                    break
            default :
                    serveFile(path.join(__dirname,'views','404.html'),'text/html',res)
        }
    }
})

server.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})

