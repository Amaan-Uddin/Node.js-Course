const Employee = require('../model/Employee')
const mongoose = require('mongoose')

const getAllEmployees = async (req,res) => {
    const employees = await Employee.find().exec()
    res.json(employees)
}

const handleNewEmployee = async (req,res) => {
    const { name,dept } = req.body
    if(!name || !dept){ return res.sendStatus(400) }
    const duplicate = await Employee.find({ name:name,department:dept }).exec()
    if(duplicate.length !== 0){ return res.sendStatus(409) }
    try {
        const collection = await Employee.find().exec()
        const UserID = collection[collection.length - 1]._id + 1 || 1
        const result = await Employee.create({
            "_id": UserID,
            "name":name,
            "department":dept
        })
        console.log(result)
        res.status(201).json({ Successful:`New Employee added to ${mongoose.connection.name}` })
    } catch (error) {
        res.sendStatus(500)        
    }
}

const updateEmployee = async (req,res) => {
    // find the collection in our Database
    const employee = await Employee.findOne({ _id : req.body._id }).exec() // employee is an object
    if(!employee){ return res.sendStatus(404) }
    try {
        if(!employee.name || !employee.department){ throw new Error('Something went wrong while retriving data from DB') }
        if(req.body.name) await Employee.updateOne({ _id:req.body._id },{ name : req.body.name }).exec()
        if(req.body.dept) await Employee.updateOne({ _id:req.body._id },{ department : req.body.dept }).exec()
        res.status(200).json({ Successful:`Employee ID ${req.body._id} has been updated.` })
    } catch (error) {
        res.status(500).json({error})
    }
}

const deleteEmployee = async (req,res) => {
    if(!req.body._id){ return res.sendStatus(400) }
    try {
        await Employee.deleteOne({ _id:req.body._id }).exec()
        res.sendStatus(204)
    } catch (error) {
        res.sendStatus(500)
    }
}

const getAnEmployee = async (req,res) => {
    if(!parseInt(req.params._id)){ return res.sendStatus(400) }
    const employee = await Employee.findOne({ _id:parseInt(req.params._id) }).exec()
    // remember the values passed insde the URL are all String type and the have to be parsed to an Integer
    if(!employee){ return res.sendStatus(404) }
    res.json(employee)
}

module.exports = { 
    getAllEmployees,
    handleNewEmployee,
    updateEmployee,
    deleteEmployee, 
    getAnEmployee
} 