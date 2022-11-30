const Product = require("../models/Product");

const productsMock = require("../mock/productsMock.json");

module.exports = async () => {
    const products = await Product.find();
    if (products.length !== productsMock.length) {
        await createInitialEntity(Product, productsMock);
    }
};

async function createInitialEntity(Model, data) {
    await Model.collection.drop();
    return Promise.all(
        data.map(async (item) => {
            try {
                const newItem = new Model(item);
                await newItem.save();
                return newItem;
            } catch (e) {
                return e;
            }
        })
    );
}
