const express = require('express')
const router = express.Router()
const employeeController = require('../../controllers/employeeController')
const rolesList = require('../../config/rolesList')
const verifyRoles = require('../../middleware/verifyRoles')

router.route('/')
    .get(employeeController.getAllEmployees)
    .post(verifyRoles(rolesList.Admin,rolesList.Editor),employeeController.handleNewEmployee)
    .put(verifyRoles(rolesList.Admin,rolesList.Editor),employeeController.updateEmployee)
    .delete(verifyRoles(rolesList.Admin),employeeController.deleteEmployee)

router.get('/:_id',employeeController.getAnEmployee)

module.exports = router