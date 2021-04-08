const User = require('../models/user')

exports.addFood = async (req, res) => {
    const { name, foodText } = req.body

    if(emptyText(foodText))
        return res.status(400).send('<h1>Bad Request</h1>')

    const user = await User.findOne({ name: name})
    if(emptyText(user))
        return res.status(404).send('<h1>User Not Found</h1>')

    user.diet.push(dietFactory(foodText, 20))
    await user.save()
    return res.status(201).redirect('/')
}

function emptyText(input) {
    if(typeof input == 'undefined' || input == null)
        return true
    return false
}

function dietFactory(foodText, calories) {
    return {
        foodName: foodText, 
        calories: calories,
        createdAt: new Date().toLocaleString()
    }
}