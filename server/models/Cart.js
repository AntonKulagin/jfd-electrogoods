const { Schema, model } = require("mongoose");

const schema = new Schema(
    {
        userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
        productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
        amount: { type: Number, require: true },
    },
    {
        timestamps: true,
    }
);

module.exports = model("Cart", schema);
