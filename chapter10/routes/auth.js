const express = require('express')
const router = express.Router()
const authorizeUsers = require('../controllers/authController')

router.route('/')
    .get(authorizeUsers.getPassword)
    .post(authorizeUsers.authorizeUser)

module.exports = router
