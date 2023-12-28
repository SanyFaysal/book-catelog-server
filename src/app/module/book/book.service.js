const Book = require("./book.model");

exports.addBookService = async (data) => {
  const result = await Book.create(data);
  return result;
};
exports.getBooksService = async (data) => {
  const result = await Book.find({});
  return result;
};
