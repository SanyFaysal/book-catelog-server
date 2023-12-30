const express = require("express");
const userController = require("./user.controller");
const { verifyToken } = require("../../middleware/verifyToken");
const router = express.Router();

router.post("/signup", userController.signup);
router.post("/login", userController.login);
router.get("/me", verifyToken, userController.getMe);
router.patch("/add-wishlist/:bookId", verifyToken, userController.addWishlist);

module.exports = { userRoutes: router };
