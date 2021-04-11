const ner = require('wink-ner')
const myNER = ner()

const neatCsv = require('neat-csv')
const csv = require('csv-parser')
// const csvFile = require('public/data/ner_dataset.csv')

const path = require('path')
const fs = require('fs')

const Food = require('../models/food')

exports.nerParser = async (foodText) => {
    const csvData = await readData('public/data/ner_dataset.csv')
    const trainingData = []

    for (let item of csvData) {
        console.log(item)
        trainingData.push(NER_Factory(item))
    }

    myNER.learn(trainingData)

    const winkTokenizer = require('wink-tokenizer')
    const tokenize = winkTokenizer().tokenize
    let tokens = tokenize(foodText)
    tokens = myNER.recognize(tokens)
    console.log(tokens)

    return await cleanTokens(tokens)
}

// let name = 'public/data/ner_dataset.csv'
// exports.nerParser = (foodText) => {
//     const trainingData = []
//     const csvData = []

//     fs.createReadStream(name)
//         .pipe(csv())
//         .on('data', (data) => {
//             csvData.push(data)
//             // console.log(data)
//         })
//         .on('end', () => {
//             for(let item of csvData) {
//                 trainingData.push(NER_Factory(item))
//             }
//             const tokens = NER_learn(trainingData, foodText)
//             console.log('Done')
//             return cleanTokens(tokens)  
//         })
// }

function NER_learn(trainingData, foodText) {
    myNER.learn(trainingData)

    const winkTokenizer = require('wink-tokenizer')
    const tokenize = winkTokenizer().tokenize

    let tokens = tokenize(foodText)
    tokens = myNER.recognize(tokens)

    console.log('Tokens: ' + tokens)
    return tokens
}

async function cleanTokens(tokens) {
    // let foods = tokens.filter(data => data.entityType === 'NNS' || data.entityType === 'NN')
    let foods = tokens.filter(data => data.tag === 'word')
    // let quantity = tokens.filter(data => data.entityType === 'CD')

    // const foodNames = foods.map(data => {foodName: data.value})
    const foodNames = foods.map(data => { return { foodName: data.value } })
    const foodList = await Food.find({})

    let finalFoodList = []
    for (let food of foodNames) {
        console.log(food)
    }
    for (let food of foodNames) {
        for (let validFood of foodList) {
            if (validFood.name === food.foodName.toLowerCase()) {
                finalFoodList.push({ foodName: food.foodName, calories:  validFood.energy.amount })
                break
            }
        }
    }

    return finalFoodList
}

async function readData(csv) {
    const parsedCsv = await neatCsv(csv)
    return parsedCsv
}

function NER_Factory(csvData) {
    return {
        text: csvData.word,
        entityType: csvData.POS,
        uid: csvData.Tag
    }
}

