const express = require("express");
const { verifyToken } = require("../../middleware/verifyToken");
const bookController = require("./book.controller");
const { checkIsOwner } = require("../../middleware/checkIsOwner");
const router = express.Router();

router.get("/", bookController.getBooks);
router.post("/create", verifyToken, bookController.addBook);
router.patch("/add-review/:bookId", verifyToken, bookController.addReview);

router.get("/all-genre", bookController.getAllGenre);
router.get(
  "/all-publication-year",
  bookController.getAllPublicationYearService
);

router
  .route("/:bookId")
  .get(bookController.getBookById)
  .patch(verifyToken, checkIsOwner, bookController.editBook)
  .delete(verifyToken, checkIsOwner, bookController.deleteBook);

module.exports = {
  bookRoutes: router,
};
