const express = require('express')
const router = express.Router()
const employeeController = require('../../controllers/employeeController')
// const verifyJWT = require('../../middleware/verifyJWT')
const rolesList = require('../../config/rolesList')
const verifyRoles = require('../../middleware/verifyRoles')

router.route('/')
    .get(employeeController.getAllEmployees)
    // .get(verifyJWT,employeeController.getAllEmployees)
    .post(verifyRoles(rolesList.Admin,rolesList.Editor),employeeController.postNewEmployee)
    .put(verifyRoles(rolesList.Admin,rolesList.Editor),employeeController.updateEmployee)
    .delete(verifyRoles(rolesList.Admin),employeeController.deleteEmployee)

router.get('/:id',employeeController.getAnEmployee)

module.exports = router