const express = require('express')
const app = express()
const path = require('path')

// config
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
// middleware
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ limit: '10kb', extended: true }))
app.use(express.json({ limit: '10kb'}))


app.get('/', (req, res) => {
    res.status(200).send('Success')
})

module.exports = app