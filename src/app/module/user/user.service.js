const User = require("./user.model");

exports.signupService = async (data) => {
  const result = await User.create(data);
  return result;
};

exports.findUserByEmailService = async (email) => {
  const result = await User.findOne({ email });
  return result;
};
exports.addWishlistService = async (userId, bookId) => {
  console.log({ userId, bookId });
  const result = await User.updateOne(
    { _id: userId },
    { $push: { wishList: { book: bookId } } }
  );
  return result;
};
