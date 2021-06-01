const ner = require('wink-ner')
const myNER = ner()
const path = require('path')
const fs = require('fs')
const Food = require('../models/food')

exports.nerParser = async (foodText) => {
    let rawData = fs.readFileSync(path.join(__dirname, '../public/data/database.json'))
    const trainingData = await JSON.parse(rawData)
    let tokens = NER_learn(trainingData, foodText)
    tokens = myNER.recognize(tokens)
    console.log('tokens: ')
    console.log(tokens)
    return await cleanTokens(tokens)
}

function NER_learn(trainingData, foodText) {
    myNER.learn(trainingData)
    const winkTokenizer = require('wink-tokenizer')
    const tokenize = winkTokenizer().tokenize
    return tokenize(foodText)
}

async function cleanTokens(tokens) {
    let foods = tokens.filter(data => data.uid === 'food')
    const foodNames = foods.map(data => { return { foodName: data.value } })
    const foodList = await Food.find({})
    
    let finalFoodList = []

    for (let food of foodNames) {
        console.log(`Expected Entity: ${JSON.stringify(food)}`)
    }

    for (let food of foodNames) {
        for (let validFood of foodList) {
            if (validFood.name === food.foodName.toLowerCase()) {
                finalFoodList.push(foodFactory(food, validFood))
                break
            }
        }
    }

    return finalFoodList
}



function foodFactory(food, validFood) {
    return {
        foodName: food.foodName,
        calories: validFood.energy.amount,
        protein: validFood.nutrients.protein.amount,
        fat: validFood.nutrients.fat.amount,
        carbohydrates: validFood.nutrients.carbohydrates.amount
    }
}
