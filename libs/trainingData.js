const ner = require('wink-ner')
const neatCsv = require('neat-csv')
const csv = require('../public/data/ner_dataset.csv')
const Food = require('../models/food')

exports.nerParser = async (foodText) => {
    const csvData = await readData(csv)
    const trainingData = []

    for(let item of csvData) {
        trainingData.push(NER_Factory(item))
    }

    myNER.learn(trainingData)

    const winkTokenizer = require('wink-tokenizer')
    const tokenize = winkTokenizer().tokenize
    let tokens = tokenize(foodText)
    tokens = myNER.recognize(tokens)
    console.log('Tokens: ' + tokens)

    return await cleanTokens(tokens)
}

async function cleanTokens(tokens) {
    let foods = tokens.filter(data => data.entityType === 'NNS' || data.entityType === 'NN')
    let quantity = tokens.filter(data => data.entityType === 'CD')
    
    const foodNames = foods.map(data => {foodName: data.value})
    const foodList = await Food.find({})
    
    let finalFoodList = []

    for(let food of foodNames) {
        if(foodList.name.includes(food.foodName.toLowerCase()))
            finalFoodList.push(food)
    }

    return finalFoodList
}

async function readData (csv) {
    const parsedCsv = await neatCsv(csv)
    console.log(parsedCsv)
    return parsedCsv
}

function NER_Factory(csvData) {
    return {
        text: csvData.word, 
        entityType: csvData.POS,
        uid: csvData.Tag
    }
}

