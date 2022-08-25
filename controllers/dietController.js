const User = require('../models/user')
const Food = require('../models/food')
const DietRecommender = require('../libs/dietRecommender')

exports.addFood = async (req, res) => {
    const {name, foodText} = req.body

    if (emptyText(foodText)) return res.status(400).send('<h1>Bad Request</h1>')

    const user = await User.findOne({name: name})

    if (emptyText(user)) return res.status(404).send('<h1>User Not Found</h1>')

    user.diet.push(dietFactory(foodText, 20))
    const dietRecommender = new DietRecommender(user)

    const foods = await Food.find({})

    const recommendedDiet = dietRecommender.recommendDiet(foods)
    user.recommendedDiet = recommendedDiet

    await user.save()
    return user
}

exports.recommendDiet = async (req, res) => {
    const {name} = req.query

    if (emptyText(name)) return res.status(400).json({"msg": "User not found"})

    const user = await User.findOne({name: name})
    const dietRecommender = new DietRecommender(user)

    const foods = await Food.find({})

    const recommendedDiet = dietRecommender.recommendDiet(foods)

    return res.status(200).json({
        "diet": recommendedDiet
    })
}

function emptyText(input) {
    if (typeof input == 'undefined' || input == null) return true
    return false
}

function dietFactory(foodText, calories) {
    return {
        foodName: foodText, calories: calories, createdAt: new Date().toLocaleString()
    }
}
