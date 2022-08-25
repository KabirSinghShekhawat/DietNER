const express = require('express')
const router = express.Router()
const dietController = require('../controllers/dietController')


router
    .route('/')
    .get(dietController.recommendDiet)
    .post(dietController.addFood)

module.exports = router