const { successResponse } = require("../../utils/response");
const { tryCatchHelper } = require("../../utils/tryCatchHelper");
const {
  addBookService,
  getBooksService,
  getBookByIdService,
  addReviewService,
  editBookService,
} = require("./book.service");

exports.addBook = tryCatchHelper(async (req, res) => {
  const data = req.body;
  const { _id: added_by } = req.user;
  await addBookService({ ...data, added_by });
  return successResponse({ res, code: 200, message: "Added successful" });
});
exports.getBooks = tryCatchHelper(async (req, res) => {
  const result = await getBooksService();
  return successResponse({
    res,
    code: 200,
    message: "Fetched successful",
    data: result,
  });
});
exports.getBookById = tryCatchHelper(async (req, res) => {
  const { bookId } = req.params;
  const result = await getBookByIdService(bookId);
  return successResponse({
    res,
    code: 200,
    message: "Fetched successful",
    data: result,
  });
});

exports.editBook = tryCatchHelper(async (req, res) => {
  const data = req.body;
  const { bookId } = req.params;
  console.log({ bookId, data });
  const result = await editBookService(bookId, data);
  return successResponse({
    res,
    code: 200,
    message: "Edited successful",
    data: result,
  });
});
exports.addReview = tryCatchHelper(async (req, res) => {
  const { bookId } = req.params;
  const data = req.body;
  const { _id } = req.user;
  const reviewData = {
    reviewed_by: _id,
    ...data,
  };
  const result = await addReviewService(bookId, reviewData);
  return successResponse({
    res,
    code: 200,
    message: "Fetched successful",
    data: result,
  });
});
