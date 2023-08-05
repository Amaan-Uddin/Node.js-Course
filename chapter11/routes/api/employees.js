const express = require('express')
const router = express.Router()
const employeeController = require('../../controllers/employeeController')
const verifyJWT = require('../../middleware/verifyJWT')
const verifyCookieJWT = require('../../middleware/verifyCookieJWT')

router.route('/')
    .get(verifyCookieJWT,employeeController.getAllEmployees)
    // .get(verifyJWT,employeeController.getAllEmployees)
    .post(employeeController.postNewEmployee)
    .put(employeeController.updateEmployee)
    .delete(employeeController.deleteEmployee)

router.get('/:id',employeeController.getAnEmployee)

module.exports = router