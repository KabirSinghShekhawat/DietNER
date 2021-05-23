const mongoose = require('mongoose')

exports.connectDatabase = () => {
    mongoose.connect('mongodb://localhost/nlpDemo', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: true
    })
        .then(() => {
            console.log('Connected To Database')
        })
        .catch(err => {
            throw new Error('Error connecting:\n' + err.error)
        })
}