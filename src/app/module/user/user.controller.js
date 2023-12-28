const { successResponse, errorResponse } = require("../../utils/response");
const { generateToken } = require("../../utils/token");
const { tryCatchHelper } = require("../../utils/tryCatchHelper");
const { findUserByEmailService, signupService } = require("./user.service");

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
    _id: user?.fullName,
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
