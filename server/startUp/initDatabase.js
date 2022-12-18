const Product = require("../models/Product");
const User = require("../models/User");

const productsMock = require("../mock/productsMock.json");
const adminsMock = require("../mock/adminsMock.json");

const bcrypt = require("bcryptjs");
const { generateUserData } = require("../utils/helpers");

module.exports = async () => {
    const products = await Product.find();
    const admins = await User.find({ isAdmin: true, isSuperAdmin: true });
    if (products.length !== productsMock.length) {
        await createInitialEntity(Product, productsMock);
    }
    if (admins.length !== adminsMock.length) {
        await createInitialAdmin(User, adminsMock, admins);
    }
};

async function createInitialEntity(Model, data) {
    await Model.collection.drop();
    return Promise.all(
        data.map(async (item) => {
            try {
                delete item._id;
                const newItem = new Model(item);
                await newItem.save();
                return newItem;
            } catch (e) {
                return e;
            }
        })
    );
}

async function createInitialAdmin(Model, data, existedData) {
    existedData.map(async (item) => {
        const removedItem = await Model.findById(item._id);
        await removedItem.remove();
    });

    return Promise.all(
        data.map(async (item) => {
            const hashedPassword = await bcrypt.hash(item.password, 12);
            try {
                delete item._id;
                const newItem = new Model({ ...generateUserData(), ...item, password: hashedPassword });
                await newItem.save();
                return newItem;
            } catch (e) {
                return e;
            }
        })
    );
}
