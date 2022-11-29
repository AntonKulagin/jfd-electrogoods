const {Schema, model} = require('mongoose')

const schema = new Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    processor: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },

}, {
    timestamps: true
})

module.exports = model('Laptop', schema)