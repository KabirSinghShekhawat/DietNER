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

exports.deleteUser = async (req, res) => {
    const {id} = req.params
    await User.findByIdAndDelete(id)
    res.status(200).send(`Deleted User with id: ${id}`)
}

exports.userList = async (req, res) => {
    const users = await User.find({})
    console.log('number of users: ' + users.length)
    console.log(users)
    return res.render('users', {users})
}

exports.userListApi = async (req, res) => {
    const users = await User.find({})
    return res.status(200).send(users)
}
exports.userDetails = async (req, res) => {
    const {id} = req.params
    const user = await User.find({_id: id})
    if(typeof user == 'undefined' || user == null)
        return res.status(404).send('user not found!')
    return res.status(200).send(user)
}

exports.removeFood = async (req, res) => {
    const {user: userId, id: foodId} = req.params
    const user = await User.findById(userId)
    const newDiet = user.diet.filter(diet => {
        const food = String(diet._id)
        return food !== foodId
    })
    await User.findByIdAndUpdate(userId, {diet: newDiet})
    res.status(200).send({removed: foodId})
}

function emptyText(input) {
    return typeof input == 'undefined' || input == null;

}