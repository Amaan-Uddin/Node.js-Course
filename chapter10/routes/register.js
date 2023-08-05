const express = require('express')
const router = express.Router()
const registerUsers = require('../controllers/registerController')

router.route('/')
    .get(registerUsers.getAllUsers)
    .post(registerUsers.handleNewUser)

module.exports = router