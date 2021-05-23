const ner = require('wink-ner')
const myNER = ner()

const neatCsv = require('neat-csv')

const path = require('path')
const fs = require('fs')

const Food = require('../models/food')

exports.nerParser = async (foodText) => {
    const stream = await readCSVFile(path.join(__dirname, '../public/data/ner_dataset.csv'))
    const csvData = await readData(stream)
    const trainingData = []

    console.log(csvData.length)

    for (let item of csvData) {
        trainingData.push(NER_Factory(item))
    }
    
    let tokens = NER_learn(trainingData, foodText)
    tokens = myNER.recognize(tokens)
    console.log(tokens)
    return await cleanTokens(tokens)
}

async function readCSVFile(filename) {
    const readStream = fs.createReadStream(filename, {encoding: 'utf8'})
    let fullStream = ''
    for await (const chunk of readStream) {
        fullStream += chunk
    }
    return fullStream
}

function NER_learn(trainingData, foodText) {
    myNER.learn(trainingData)
    const winkTokenizer = require('wink-tokenizer')
    const tokenize = winkTokenizer().tokenize
    return tokenize(foodText)
}

async function cleanTokens(tokens) {
    // let foods = tokens.filter(data => data.entityType === 'NNS' || data.entityType === 'NN' || data.entityType === 'NNP')
    let foods = tokens
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

async function readData(csv) {
    return neatCsv(csv);
}

function NER_Factory({Word, POS, Tag}) {
    return {
        text: Word,
        entityType: POS,
        uid: Tag
    }
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
