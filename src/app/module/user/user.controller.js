const { successResponse, errorResponse } = require("../../utils/response");
const { generateToken } = require("../../utils/token");
const { findUserByEmailService } = require("./user.service");

exports.signup = async (req, res) => {
  try {
    const data = req.body;
    const { email } = data;
    const isAvailableUser = await findUserByEmailService(email);
    if (isAvailableUser) {
      return errorResponse({ res, code: 400, message: "User already existed" });
    }
    const result = await signupService(data);
    const token = generateToken(result);
    successResponse({
      res,
      code: 200,
      message: "Signup successful",
      token,
    });
  } catch (error) {
    errorResponse({ res, code: 400, message: error.message });
  }
};
