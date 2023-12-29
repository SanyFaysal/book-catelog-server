const express = require("express");
const { verifyToken } = require("../../middleware/verifyToken");
const bookController = require("./book.controller");
const router = express.Router();

router.get("/", bookController.getBooks);
router.post("/create", verifyToken, bookController.addBook);

router.patch("/add-review/:bookId", verifyToken, bookController.addReview);
router.route("/:bookId").get(bookController.getBookById);

module.exports = {
  bookRoutes: router,
};
