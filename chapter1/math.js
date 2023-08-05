// this is going to be our math module from where we will export some functions

const add = (a,b) => a + b;
const subtract = (a,b) => a - b;
const multiply = (a,b) => a * b;
const divide = (a,b) => a / b;

// now that our functions are ready , export them
module.exports = { add, subtract, multiply, divide }