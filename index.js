const express = require('express')
const app = express()
const db = require('./db')
const path = require('path')

const homeRoute = require('./routes/home')
const userRoute = require('./routes/user')
const dietRoute = require('./routes/diet')

db.connectDatabase();

// config
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

// middleware
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ limit: '10kb', extended: true }))
app.use(express.json({ limit: '10kb'}))

// Routes
app.use('/', homeRoute)
app.use('/user', userRoute)
app.use('/diet', dietRoute)

module.exports = app