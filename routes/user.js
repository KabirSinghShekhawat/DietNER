const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')

router.route('/')
    .get(userController.newUser)
    .post(userController.addUser)

router.route('/all')
    .get(userController.userList)

router.route('/list')
    .get(userController.userListApi)

module.exports = router