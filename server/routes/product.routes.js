const express = require("express");
const Product = require("../models/Product");
const router = express.Router({ mergeParams: true });

router.get("/", async (req, res) => {
    try {
        const list = await Product.find();
        res.status(200).send(list);
    } catch (e) {
        res.status(500).json({
            message: "На сервере произошла ошибка, попробуйте позже",
        });
    }
});

router.post("/", async (req, res) => {
    try {
        const newProduct = await Product.create(req.body);
        res.status(201).send(newProduct);
    } catch (error) {
        res.status(500).json({
            message: "На сервере произошла ошибка, попробуйте позже",
        });
    }
});

router.get("/:productId", async (req, res) => {
    try {
        const { productId } = req.params;

        const currentProduct = await Product.findById(productId);
        res.send(currentProduct);
    } catch (e) {
        res.status(500).json({
            message: "На сервере произошла ошибка, попробуйте позже",
        });
    }
});

router.patch("/:productId", async (req, res) => {
    try {
        const { productId } = req.params;
        const updatedProduct = await Product.findByIdAndUpdate(productId, req.body, { new: true });
        res.send(updatedProduct);
    } catch (e) {
        res.status(500).json({
            message: "На сервере произошла ошибка, попробуйте позже",
        });
    }
});

router.delete("/:productId", async (req, res) => {
    try {
        const { productId } = req.params;
        const removedProduct = await Product.findById(productId);
        await removedProduct.remove();
        return res.send(null);
    } catch (error) {
        res.status(500).json({
            message: "На сервере произошла ошибка, попробуйте позже",
        });
    }
});

module.exports = router;
