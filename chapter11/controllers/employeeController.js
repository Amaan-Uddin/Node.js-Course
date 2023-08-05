const employeeDB = {
    employees: require('../model/employees.json'),
    setEmployees: function(data) {this.employees = data} 
}
const fsPromises = require('fs').promises
const path = require('path')

const getAllEmployees = (req,res) => {
    console.log(employeeDB.employees)
    res.json(employeeDB.employees)
}

const postNewEmployee = async (req,res) => {
    // create an employee ID and aquire the data from req.body
    const newEmployee = {
        id: employeeDB.employees?.length ? employeeDB.employees[employeeDB.employees.length - 1].id + 1 : 1, // optional chaining and terenary op
        name: req.body.name,
        department: req.body.department
    }
    // check if the values are present and valid
    if(!newEmployee.name || !newEmployee.department){
        return res.status(400).json({ "message":"name and department are required." })
    }
    employeeDB.setEmployees([...employeeDB.employees,newEmployee])
    try{
        await fsPromises.writeFile(path.join(__dirname,'..','model','employees.json'),JSON.stringify(employeeDB.employees))
        res.status(201).json({ 'successful':`New employee ${newEmployee.name} has been added to records.` })
    }catch(err){
        res.status(500).json({ 'message':err.message })
    }
}

const updateEmployee = async (req,res) => {
    const employee = employeeDB.employees.find(employee => employee.id === req.body.id)
    if(!employee){
        return res.status(400).json({ 'message':"employee not found" })
    }
    if(req.body.name) employee.name = req.body.name
    if(req.body.department) employee.name = req.body.department
    // create a new array without the employee we just updated
    const filteredArray = employeeDB.employees.filter(employees => employees.id !== employee.id)
    const employeeData = [...filteredArray,employee]
    employeeDB.setEmployees(employeeData.sort((a,b) => {
        return a.id - b.id
    }))
    try {
        await fsPromises.writeFile(path.join(__dirname,'..','model','employees.json'),JSON.stringify(employeeDB.employees))
        res.status(201).json({ "updated":`employee number ${employee.id} has been updated` })
    }catch(err){
        res.status(500).json({ "message":err.message })   
    }
}

const deleteEmployee = async (req,res) => {
    const employee = employeeDB.employees.find(employee => employee.id === req.body.id)
    if(!employee){
        return res.status(400).json({ 'message':`employee number ${req.body.id} does not exist` })
    }
    const filteredArray = employeeDB.employees.filter(employees => employees.id !== employee.id)
    employeeDB.setEmployees([...filteredArray])
    try {
        await fsPromises.writeFile(path.join(__dirname,'..','model','employees.json'),JSON.stringify(employeeDB.employees))
        res.status(201).json({ "deleted":`employee number ${employee.id} has been deleted` })
    } catch (err) {
        res.status(500).json({ 'message':err.message })
    }
}

const getAnEmployee = (req,res) => {
    const employee = employeeDB.employees.find(employee => employee.id === Number(req.params.id))
    if(!employee){
        return res.status(400).json({ 'message':`employee number ${req.params.id} does not exist` })
    }
    res.json(employee)
}

module.exports = {
    getAllEmployees,
    postNewEmployee,
    updateEmployee,
    deleteEmployee,
    getAnEmployee
}