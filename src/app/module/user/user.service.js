const User = require("./user.model");

exports.signupService = async (data) => {
  const result = await User.create(data);
  return result;
};

exports.findUserByEmailService = async (email) => {
  const result = await User.findOne({ email }).populate("wishlist.book");
  return result;
};
exports.addWishlistService = async (userId, bookId) => {
  const isBookExist = await User.findOne({
    _id: userId,
    "wishlist.book": bookId,
  });

  if (!isBookExist) {
    const result = await User.updateOne(
      { _id: userId },
      { $push: { wishlist: { book: bookId } } }
    );
    return result;
  }
};
exports.removeWishlistService = async (userId, bookId) => {
  const result = await User.updateOne(
    { _id: userId },
    { $pull: { wishlist: { book: bookId } } }
  );
  return result;
};
exports.updateWishlistService = async (userId, data) => {
  const result = await User.updateOne(
    { _id: userId, "wishlist.book": data?.book },
    { $set: { "wishlist.$.status": data?.status } }
  );

  return result;
};
