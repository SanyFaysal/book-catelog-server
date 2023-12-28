const express = require("express");
const userController = require("./user.controller");
const router = express.Router();

router.post("/signup", userController.signup);

module.exports = { userRoutes: router };
