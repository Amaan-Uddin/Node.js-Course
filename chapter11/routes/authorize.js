const express = require('express')
const router = express.Router()
const authController = require('../controllers/authController')

router.route('/')
    .get(authController.getAllUsers)
    .post(authController.authorizeUser)

router.get('/:user',authController.getUser)

module.exports = router