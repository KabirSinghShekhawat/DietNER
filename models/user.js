const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    diet: [
        {
            foodName: {
                type: String,
                default: 'food'
            },
            calories: {
                type: Number,
                default: 0.00
            },
            createdAt: {
                type: Date,
                default: Date.now
            }
        }
    ]
},
    {
        timestamps: true
    }
)

const User = mongoose.model('User', userSchema)

module.exports = User