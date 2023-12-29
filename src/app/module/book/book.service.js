const Book = require("./book.model");

exports.addBookService = async (data) => {
  const result = await Book.create(data);
  return result;
};
exports.getBooksService = async (data) => {
  const result = await Book.find({});
  return result;
};
exports.getBookByIdService = async (bookId) => {
  const result = await Book.findOne({ _id: bookId });
  return result;
};
exports.addReview = async (bookId, data) => {
  const result = await Book.findOne({ _id: bookId });
  return result;
};
