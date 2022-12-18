const { Schema, model } = require("mongoose");

const schema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            required: true,
        },
        info: {
            type: String,
        },
        price: {
            type: Number,
            required: true,
        },
        oldPrice: {
            type: Number,
        },
        type: {
            type: String,
            required: true,
        },
        new: Boolean,
    },
    {
        timestamps: true,
    }
);

module.exports = model("Product", schema);
