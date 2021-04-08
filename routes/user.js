const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')

router.route('/')
.get(userController.newUser)
.post(userController.addUser)

module.exports = router