const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const { findUserByEmailService } = require("../module/user/user.service");
const { getBookByIdService } = require("../module/book/book.service");
const { errorResponse } = require("../utils/response");

exports.checkIsOwner = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const userId = _id.toString();
    const { bookId } = req.params;
    const bookDetails = await getBookByIdService(bookId);
    const added_by = bookDetails?.added_by?._id.toString();

    if (added_by !== userId) {
      return errorResponse({ res, code: 400, error: "You are not authorized" });
    }
    next();
  } catch (error) {
    errorResponse({ res, code: 400, error: error?.message });
  }
};
