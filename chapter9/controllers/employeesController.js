// we will define the necessary methods for all the HTTP request and export it to our router module
const data = {
    employees: require('../model/employees.json'),
    setEmployees: function(data) {this.employees = data}
}

const getAllEmployees = (req,res) => {
    res.json(data.employees)
}
const addNewEmployee = (req,res) => {
    const newEmployee = {
        id: data.employees[data.employees.length - 1].id + 1 || 1, // getting the last employee id and incrementing
        name: req.body.name,
        profession: req.body.profession
    }
    if(!newEmployee.name || !newEmployee.profession){
        return res.status(400).json({ "message":"name and profession are required." })
    }
    data.setEmployees([...data.employees,newEmployee])
    res.status(201).json(data.employees) // 201 - created new record
}
const updateEmployee = (req,res) => {
    const employee = data.employees.find(emp => emp.id === parseInt(req.body.id))
    if(!employee){
        return res.status(400).json({ "message":`Employee ${req.body.id} not found` })
    }
    if(req.body.name) employee.name = req.body.name
    if(req.body.profession) employee.name = req.body.profession

    const filteredArray = data.employees.filter(emp => emp.id !== parseInt(req.body.id)) // create a new array without the updated id
    const unsortedArray = [...filteredArray,employee]
    data.setEmployees(unsortedArray.sort((a,b) => {
        return a.id - b.id // idk why this works, but it works
    }))
    res.json(data.employees)
}
const deleteEmployee = (req,res) => {
    const employee = data.employees.find(emp => emp.id === parseInt(req.body.id))
    if(!employee){
        return res.status(400).json({ "message":`Employee ${req.body.id} not found` })
    }
    const filteredArray = data.employees.filter(emp => emp.id !== parseInt(req.body.id))
    data.setEmployees([...filteredArray])
    res.json(data.employees)
}
const getAnEmployee = (req,res) => {
    const employee = data.employees.find(emp => emp.id === parseInt(req.body.id))
    if(!employee){
        return res.status(400).json({ "message":`Employee ${req.body.id} not found` })
    }
    res.json(employee)
}

module.exports = {
    getAllEmployees,
    addNewEmployee,
    updateEmployee,
    deleteEmployee,
    getAnEmployee
}