const ner = require('wink-ner')
const csv = require('csv-parser')
const myNER = ner();
const fs = require('fs')
const path = require('path')
// const util = require('util')

// const readData = (name, target, final) => {
//     fs.createReadStream(path.join(__dirname, name))
//         .pipe(csv())
//         .on('data', (data) => {
//             target.push(data)
//         })
//         .on('end', () => {
//             formatData(final, target)
//             // console.log(final)
//             NLP(final)
//             console.log('Done')
//         })
// }

// const datasetName = 'ner_dataset.csv'
let result = []
let trainingData = []

fs.createReadStream(path.join(__dirname, 'ner_dataset.csv'))
    .pipe(csv())
    .on('data', (data) => {
        result.push(data)
    })
    .on('end', async () => {
        formatData(trainingData, result)
        await trainModel(trainingData)
        console.log('Done')
    })

// readData(datasetName, result, trainingData)

const formatData = (trainingData, result) => {
    for (let data of result) {
        formattedData = {
            text: data.Word,
            entityType: data.POS,
            uid: data.Tag
        }

        trainingData.push(formattedData)
    }
}

const trainModel = async (trainingData) => {
    await myNER.learn(trainingData)
    console.log('Training model')
}

const winkTokenizer = require('wink-tokenizer')
const tokenize = winkTokenizer().tokenize
let tokens = tokenize('I ate 3 Apples Today')
tokens = await myNER.recognize(tokens)
console.log(tokens)