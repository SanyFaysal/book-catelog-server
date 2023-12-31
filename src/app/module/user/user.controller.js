const { successResponse, errorResponse } = require("../../utils/response");
const { generateToken } = require("../../utils/token");
const { tryCatchHelper } = require("../../utils/tryCatchHelper");
const {
  findUserByEmailService,
  signupService,
  addWishlistService,
  removeWishlistService,
  updateWishlistService,
} = require("./user.service");

exports.signup = tryCatchHelper(async (req, res) => {
  const data = req.body;
  const { email } = data;
  const isAvailableUser = await findUserByEmailService(email);
  if (isAvailableUser) {
    return errorResponse({ res, code: 400, error: "User already existed" });
  }
  const result = await signupService(data);
  const token = generateToken(result);
  return successResponse({
    res,
    code: 200,
    message: "Signup successful",
    token,
    data: result,
  });
});

exports.login = tryCatchHelper(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return errorResponse({
      res,
      code: 401,
      error: "Please give your credentials",
    });
  }
  const user = await findUserByEmailService(email);

  if (!user) {
    return errorResponse({
      res,
      code: 404,
      error: "No result found with this email",
    });
  }

  const isValidPassword = user.comparePassword(password, user.password);

  if (!isValidPassword) {
    return errorResponse({ res, code: 403, error: "Password not matched" });
  }
  const token = generateToken(user);
  const userData = {
    email: user?.email,
    fullName: user?.fullName,
    _id: user?._id,
    wishlist: user?.wishlist,
  };
  return successResponse({
    res,
    code: 200,
    message: "Logged in",
    token,
    data: userData,
  });
});

exports.getMe = tryCatchHelper(async (req, res) => {
  const { email } = req.user;
  const result = await findUserByEmailService(email);
  if (!result) {
    return errorResponse({
      res,
      code: 400,
      error: "Token is not verified",
    });
  }
  return successResponse({
    res,
    code: 200,
    message: "successfully get data",
    data: result,
  });
});

exports.addWishlist = tryCatchHelper(async (req, res) => {
  const { _id } = req.user;
  const userId = _id?.toString();
  const { bookId } = req.params;
  const result = await addWishlistService(userId, bookId);
  return successResponse({
    res,
    code: 200,
    message: "successfully add",
    data: result,
  });
});
exports.removeWishlist = tryCatchHelper(async (req, res) => {
  const { _id } = req.user;
  const userId = _id?.toString();
  const { bookId } = req.params;
  const result = await removeWishlistService(userId, bookId);
  return successResponse({
    res,
    code: 200,
    message: "successfully removed",
    data: result,
  });
});
exports.updateWishlist = tryCatchHelper(async (req, res) => {
  const { _id } = req.user;
  const userId = _id?.toString();
  const data = req.body;
  const result = await updateWishlistService(userId, data);
  return successResponse({
    res,
    code: 200,
    message: "successfully update",
    data: result,
  });
});
