const Book = require("./book.model");

exports.addBookService = async (data) => {
  const result = await Book.create(data);
  return result;
};
exports.getBooksService = async (query) => {
  let filterQuery = {};
  if (query?.searchTerm) {
    filterQuery.$or = [
      { title: { $regex: query?.searchTerm, $options: "i" } },
      { genre: { $regex: query?.searchTerm, $options: "i" } },
      { author: { $regex: query?.searchTerm, $options: "i" } },
      { publication_year: { $regex: query?.searchTerm, $options: "i" } },
    ];
  }

  if (query?.genre) {
    if (query?.genre === "all") delete filterQuery.genre;
    else filterQuery.genre = query?.genre;
  }
  if (query?.publication_year) {
    if (query?.publication_year === "all") delete filterQuery.publication_year;
    else filterQuery.publication_year = query?.publication_year;
  }
  if (query?.limit) {
    const result = await Book.find()
      .sort({ createdAt: "desc" })
      .limit(parseInt(query?.limit));
    return result;
  } else {
    const result = await Book.find(filterQuery);
    return result;
  }
};
exports.getBookByIdService = async (bookId) => {
  const result = await Book.findOne({ _id: bookId })
    .populate("reviews")
    .populate({
      path: "reviews.reviewed_by",
      select: "-password", // Exclude the 'password' field
    });
  return result;
};

exports.editBookService = async (bookId, data) => {
  const result = await Book.updateOne({ _id: bookId }, data);
  return result;
};
exports.deleteBookService = async (bookId) => {
  const result = await Book.deleteOne({ _id: bookId });
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

exports.getAllGenreService = async () => {
  const result = await Book.distinct("genre");
  return result;
};
exports.getAllPublicationYearService = async () => {
  const result = await Book.distinct("publication_year");
  return result;
};
