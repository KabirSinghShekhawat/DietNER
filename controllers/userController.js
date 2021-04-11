const User = require('../models/user')

exports.newUser = (req, res) => {
    return res.status(200).render('newUser')
}

exports.addUser = async (req, res) => {
    const { name } = req.body
    if(emptyText(name))
        return res.status(400).send('<h1>Bad Request</h1>')
    const newUser = new User({name: name})
    await newUser.save()
    return res.status(201).redirect('/')
}

exports.userList = async (req, res) => {
    const users = await User.find({})
    console.log('number of users: ' + users.length)
    console.log(users)
    return res.render('users', {users})
}

function emptyText(input) {
    if(typeof input == 'undefined' || input == null)
        return true
    return false
}