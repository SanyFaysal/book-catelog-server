const { successResponse } = require("../../utils/response");
const { tryCatchHelper } = require("../../utils/tryCatchHelper");
const { addBookService, getBooksService } = require("./book.service");

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
