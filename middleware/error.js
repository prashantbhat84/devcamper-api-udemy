const ErrorResponse = require("../utils/errorResponse");
const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;
  //log to console for dev
  //   console.log(err.stack.red);

  //mongoose bad object ID
  //   console.log(err);

  if (err.name === "CastError") {
    // catch block error in bootcamp controller
    const message = `Resource with ID :${err.value} does not exist`;
    error = new ErrorResponse(message, 404);
  }
  res
    .status(error.statusCode || 500)
    .json({ success: false, error: error.message || "Server Error" });
};

module.exports = errorHandler;
