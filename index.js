const express = require('express')
const app = express()
const db = require('./db')
const path = require('path')
const User = require('./models/user')

db.connectDatabase();

// config
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

// middleware
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ limit: '10kb', extended: true }))
app.use(express.json({ limit: '10kb'}))


app.get('/', (req, res) => {
    res.status(200).render('index')
})

app.get('/user', (req, res) => {
    res.status(200).render('newUser')
})

app.post('/user', async (req, res) => {
    const { name } = req.body
    if(emptyText(name))
        return res.status(400).send('<h1>Bad Request</h1>')
    const newUser = new User({name: name})
    await newUser.save()
    return res.status(201).redirect('/')
})

app.post('/diet', async (req, res) => {
    const { name, foodText } = req.body
    if(emptyText(foodText))
        return res.status(400).send('<h1>Bad Request</h1>')
    const user = await User.findOne({ name: name})
    if(emptyText(user))
        return res.status(404).send('<h1>User Not Found</h1>')
    user.diet.push({foodName: foodText, calories: 20, createdAt: new Date().toLocaleString()})
    await user.save()
    return res.status(201).redirect('/')
})

function emptyText(input) {
    if(typeof input == 'undefined' || input == null)
        return true
    return false
}

module.exports = app