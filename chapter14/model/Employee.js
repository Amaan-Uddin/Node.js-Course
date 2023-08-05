const mongoose = require('mongoose')
const Schema = mongoose.Schema

// create a schema for employees
const employeeScheema = new Schema({
    _id: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    department: {
        type: String,
        required: true
    }
})

// now create the model for the schema we just designed
const employees = mongoose.model('Employee',employeeScheema) 
// remember mongoose will automatically convert the model name to a plural lowercase 

module.exports = employees

