// the funtions from math module will be imported here and executed

const math = require('./math')
// the variable math has all the fucntions from 'math' module
// math = { add, subtract, multiply, divide }, math is an object of functions

console.log(math.add(2,3))
console.log(math.subtract(2,3))
console.log(math.multiply(2,3))
console.log(math.divide(2,3))

// another way is to de-construct the object and assign the function to various identifiers

const { add, subtract, multiply, divide } = require('./math')

console.log(add(10,1))
console.log(subtract(10,1))
console.log(multiply(10,2))
console.log(divide(10,2))
