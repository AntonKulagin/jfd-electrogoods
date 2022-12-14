const express = require("express");
const router = express.Router({ mergeParams: true });

router.use("/auth", require("./auth.routes"));
router.use("/product", require("./product.routes"));
router.use("/user", require("./user.routes"));
router.use("/cart", require("./cart.routes"));

module.exports = router;
