const { errorResponse } = require("./response");

exports.tryCatchHelper = (fn) => async (req, res) => {
  try {
    await fn(req, res);
  } catch (error) {
    errorResponse({ res, code: 403, error: error.message });
  }
};
