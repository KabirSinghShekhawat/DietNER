const User = require('../models/user')
const NER = require('../libs/trainingData')

exports.addFood = async (req, res) => {
    const { name, foodText } = req.body

    if(emptyText(foodText))
        return res.status(400).send('<h1>Bad Request</h1>')

    const user = await User.findOne({ name: name})
    if(emptyText(user))
        return res.status(404).send('<h1>User Not Found</h1>')

    const foodItems = await NER.nerParser(foodText)

    for(let foodItem of foodItems) {
        user.diet.push(dietFactory(foodItem))
    }

    await user.save()
    return res.status(201).send(foodItems)
}

function emptyText(input) {
    if(typeof input == 'undefined' || input == null)
        return true
    return false
}

function dietFactory(food) {
    return {
        foodName: food.foodName, 
        calories: food.calories,
        protein: food.protein,
        fat: food.fat,
        carbohydrates: food.carbohydrates,
        createdAt: new Date()
    }
}