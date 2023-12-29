const express = require("express");
const { verifyToken } = require("../../middleware/verifyToken");
const bookController = require("./book.controller");
const router = express.Router();

router.post("/create", verifyToken, bookController.addBook);
router.get("/", bookController.getBooks);
router.get("/:bookId", bookController.getBookById);

module.exports = {
  bookRoutes: router,
};
