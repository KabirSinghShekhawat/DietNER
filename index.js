const express = require('express')
const app = express()
const cors = require('cors')
const db = require('./db')
const path = require('path')
const morgan = require('morgan')

const userRoute = require('./routes/user')
const dietRoute = require('./routes/diet')
const apiRoute = require('./routes/api')

db.connectDatabase();

// middleware
app.use(morgan('dev'))
app.use(cors())
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ limit: '10kb', extended: true }))
app.use(express.json({ limit: '10kb'}))

// Routes
app.use('/user', userRoute)
app.use('/diet', dietRoute)
app.use('/api', apiRoute)

module.exports = app
