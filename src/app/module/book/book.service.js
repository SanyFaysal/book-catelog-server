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
  const result = await Book.findOne({ _id: bookId }).populate(
    "reviews",
    "reviews.$.reviewed_by"
  );
  return result;
};
exports.addReviewService = async (bookId, data) => {
  const result = await Book.updateOne(
    { _id: bookId },
    {
      $push: { reviews: data },
    }
  );
  return result;
};
