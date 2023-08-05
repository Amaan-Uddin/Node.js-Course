// methods to move large chunck of data

const fs = require('fs')
const path = require('path')

const rs = fs.createReadStream(path.join(__dirname,'files','lorem.txt'),{encoding:'utf8'})

const ws = fs.createWriteStream(path.join(__dirname,'files','newLorem.txt'))

// 2 ways to write data from one file to another

rs.on('data',(data) => {
    ws.write(data)
})

// or
// rs.pipe(ws)