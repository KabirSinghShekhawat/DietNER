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
router.route('/list/:id')
    .get(userController.userDetails)
    .delete(userController.deleteUser)
    router.route('/list/:user/diet/:id')
    .patch(userController.removeFood)

module.exports = router