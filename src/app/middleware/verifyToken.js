const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const { findUserByEmailService } = require("../module/user/user.service");
const { errorResponse } = require("../utils/response");

exports.verifyToken = async (req, res, next) => {
  try {
    const token = req?.headers?.authorization?.split(" ")[1];

    if (!token) {
      return errorResponse({ res, code: 403, error: "Token not found" });
    }
    const decoded = await promisify(jwt.verify)(
      token,
      process.env.TOKEN_SECRET
    );

    const user = await findUserByEmailService(decoded.email);
    req.user = user;
    next();
  } catch (error) {
    errorResponse({ res, code: 400, error: error.message });
  }
};
