const express = require('express')
const app = express()
const cors = require('cors')
const db = require('./db')
const path = require('path')

const homeRoute = require('./routes/home')
const userRoute = require('./routes/user')
const dietRoute = require('./routes/diet')
const apiRoute = require('./routes/api')

db.connectDatabase();

// config
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

// middleware
app.use(cors())
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ limit: '10kb', extended: true }))
app.use(express.json({ limit: '10kb'}))

// Routes
app.use('/', homeRoute)
app.use('/user', userRoute)
app.use('/diet', dietRoute)
app.use('/api', apiRoute)

module.exports = app