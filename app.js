const ner = require('wink-ner')
const csv = require('csv-parser')
const myNER = ner();
const fs = require('fs')
const path = require('path')

const readData = (name, target, final) => {
    fs.createReadStream(path.join(__dirname, name))
        .pipe(csv())
        .on('data', (data) => {
            target.push(data)
        })
        .on('end', () => {
            formatData(final, target)
            // console.log(final)
            NLP(final)
            console.log('Done')
        })
}

const datasetName = 'ner_dataset.csv'
let result = []
let trainingData = []

readData(datasetName, result, trainingData)

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



const NLP = (trainingData) => {

    myNER.learn(trainingData)

    const winkTokenizer = require('wink-tokenizer')
    const tokenize = winkTokenizer().tokenize
    let tokens = tokenize('I ate 3 Apples Today')
    tokens = myNER.recognize(tokens)
    console.log(tokens)
}