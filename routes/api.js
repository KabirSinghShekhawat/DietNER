const express = require('express')
const router = express.Router()
const apiController = require('../controllers/apiController')


router.route('/ner')
.post(apiController.addFood)

module.exports = router