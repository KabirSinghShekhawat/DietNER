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


function emptyText(input) {
    if(typeof input == 'undefined' || input == null)
        return true
    return false
}