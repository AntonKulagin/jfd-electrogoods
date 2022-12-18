const express = require("express");
const router = express.Router({ mergeParams: true });
const User = require("../models/User");
const auth = require("../middleware/auth.middleware");

router.get("/", auth, async (req, res) => {
    try {
        const usersList = await User.find();
        res.send(usersList);
    } catch (error) {
        res.status(500).json({
            message: "На сервере произошла ошибка, попробуйте позже",
        });
    }
});

router
    .route("/:userId")
    .get(auth, async (req, res) => {
        try {
            const { userId } = req.params;

            if (userId === req.user._id) {
                const currentUser = await User.findById(userId);
                res.send(currentUser);
            } else {
                res.status(401).json({ message: "Unauthorized" });
            }
        } catch (e) {
            res.status(500).json({
                message: "На сервере произошла ошибка, попробуйте позже",
            });
        }
    })

    .patch(auth, async (req, res) => {
        try {
            const { userId } = req.params;

            const payload = req.body;

            if (userId === req.user._id) {
                if (payload._id) {
                    const updatedUser = await User.findByIdAndUpdate(payload._id, payload, { new: true });
                    res.status(201).send(updatedUser);
                } else {
                    const updatedUser = await User.findByIdAndUpdate(userId, req.body, { new: true });
                    res.status(201).send(updatedUser);
                }
            } else {
                res.status(401).json({ message: "Unauthorized" });
            }
        } catch (e) {
            res.status(500).json({
                message: "На сервере произошла ошибка, попробуйте позже",
            });
        }
    });

module.exports = router;
