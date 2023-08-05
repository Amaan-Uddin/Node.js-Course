console.log('testing nodemon')
console.log('test successful')


const { format } = require('date-fns')
const { v4: uuid } = require('uuid')

console.log(format(new Date(),'yyyyMMdd\tHH:mm:ss'))
console.log("package.json Script is running on dev")

console.log("generate new uuid")
console.log(uuid()) // if we don't specify v4 during the importing of uuid, then log(uuid.v4())
