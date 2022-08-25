const User = require('../models/user')


exports.addUser = async (req, res) => {
    const {name, height, weight} = req.body

    if (emptyText(name)) return res.status(400).send('<h1>Bad Request</h1>')

    const newUser = new User({
        name: name, height: parseFloat(height), weight: parseFloat(weight)
    })

    await newUser.save()
}

exports.deleteUser = async (req, res) => {
    const {id} = req.params

    await User.findByIdAndDelete(id)

    res.status(200).send(`Deleted User with id: ${id}`)
}

exports.userList = async (req, res) => {
    return await User.find({});
}

exports.userListApi = async (req, res) => {
    const users = await User.find({})
    return res.status(200).send(users)
}
exports.userDetails = async (req, res) => {
    const {id} = req.params
    const user = await User.find({_id: id})

    if (typeof user == 'undefined' || user.length === 0) return res.status(404).send('user not found!')

    return res.status(200).send(user[0])
}

exports.removeFood = async (req, res) => {
    const {user: userId, id: foodId} = req.params

    const user = await User.findById(userId)

    const newDiet = user.diet.filter(diet => {
        const food = String(diet._id)
        return food !== foodId
    })

    const recommendedDiet = user.recommendedDiet.filter(diet => {
        const food = String(diet._id)
        console.log(food)
        return food !== foodId
    })

    await User.findByIdAndUpdate(userId, {diet: newDiet, recommendedDiet: recommendedDiet})
    res.status(200).send({removed: foodId})
}

exports.recommendDiet = async (req, res) => {
    const {user: userId} = req.params

    const user = await User.findById(userId)


}

function emptyText(input) {
    return typeof input == 'undefined' || input == null;

}
