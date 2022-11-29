const express = require("express");
const Laptop = require("../models/Latop");
const router = express.Router({ mergeParams: true });

router.get("/", async (req, res) => {
    try {
        const list = await Laptop.find();
        res.status(200).send(list);
    } catch (e) {
        res.status(500).json({
            message: "На сервере произошла ошибка, попробуйте позже",
        });
    }
});

module.exports = router;
