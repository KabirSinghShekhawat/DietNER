const express = require('express')
const router = express.Router()
const dietController = require('../controllers/dietController')


router.route('/')
.post(dietController.addFood)

module.exports = router