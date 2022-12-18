const { Schema, model } = require("mongoose");

const schema = new Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, uniq: true },
        password: { type: String, required: true },
        image: String,
        sex: { type: String, enum: ["male", "female"] },
        isSuperAdmin: Boolean,
        isAdmin: Boolean,
    },
    {
        timestamps: true,
    }
);

module.exports = model("Users", schema);
