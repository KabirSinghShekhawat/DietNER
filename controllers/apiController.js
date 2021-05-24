const User = require('../models/user')
const NER = require('../libs/Winkner')

exports.addFood = async (req, res) => {
    const { username, foodData } = req.body

    if(emptyText(foodData))
        return res.status(400).send('<h1>Bad Request</h1>')

    const user = await User.findOne({ name: username})
    if(emptyText(user))
        return res.status(404).send('<h1>User Not Found</h1>')

    const foodItems = await NER.nerParser(foodData)

    for(let foodItem of foodItems) {
        user.diet.push(dietFactory(foodItem))
    }

    await user.save()
    return res.status(201).send(foodItems)
}

function emptyText(input) {
    return typeof input == 'undefined' || input == null;

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