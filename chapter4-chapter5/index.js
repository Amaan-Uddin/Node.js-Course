// chapter 4
// import logEvent
const logEvent = require('./logEvents')

// import the Event Emitter module
const eventEmitter = require('events')

// create a object that inherits the properties of eventEmitter, for that create a class first
class MyEmitter extends eventEmitter {}

const myEmitter = new MyEmitter() // an event listner and emitter is created

myEmitter.on('log',(message) => {
    logEvent(message)
})

setTimeout(() => {
    myEmitter.emit('log','An event has been emitted.')
},2000)