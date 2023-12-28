exports.successResponse = ({ res, code, ...payload }) => {
  res.status(code).json({
    status: "Success",
    ...payload,
  });
};

exports.errorResponse = ({ res, code, ...payload }) => {
  res.status(code).json({
    status: "Failed",
    ...payload,
  });
};
