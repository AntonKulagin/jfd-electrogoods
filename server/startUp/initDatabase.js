const Computer = require("../models/Computer");
const Laptop = require("../models/Latop");

const computersMock = require("../mock/computers.json");
const laptopsMock = require("../mock/laptop.json");

module.exports = async () => {
    const computers = await Computer.find();
    if (computers.length !== computersMock.length) {
        await createInitialEntity(Computer, computersMock);
    }
    const laptops = await Laptop.find();
    if (laptops.length !== laptopsMock.length) {
        await createInitialEntity(Laptop, laptopsMock);
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
