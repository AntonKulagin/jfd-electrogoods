const express = require("express");
const router = express.Router({ mergeParams: true });
const auth = require("../middleware/auth.middleware");
const Cart = require("../models/Cart");

router.get("/", auth, async (req, res) => {
    try {
        const list = await Cart.find({ userId: req.user._id });
        res.send(list);
    } catch (e) {
        res.status(500).json({
            message: "На сервере произошла ошибка, попробуйте позже",
        });
    }
});

router.post("/:productId", auth, async (req, res) => {
    try {
        const { productId } = req.params;
        const addedProduct = await Cart.create({
            productId,
            userId: req.user._id,
        });

        res.status(201).send(addedProduct);
    } catch (e) {
        res.status(500).json({
            message: "На сервере произошла ошибка, попробуйте позже",
        });
    }
});

router.delete("/:cartId", auth, async (req, res) => {
    try {
        const { cartId } = req.params;
        const removedCart = await Cart.findById(cartId);

        if (removedCart.userId.toString() === req.user._id) {
            await removedCart.remove();
            return res.send(null);
        } else {
            return res.status(401).json({ message: "Unauthorized" });
        }
    } catch (e) {
        res.status(500).json({
            message: "На сервере произошла ошибка, попробуйте позже",
        });
    }
});

module.exports = router;
