const ErrorResponse = require("../utils/errorResponse");
const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;
  //log to console for dev only while testing and you get an error code of 500
  //   console.log(err);

  //mongoose bad object ID

  if (err.name === "CastError") {
    // catch block error in bootcamp controller
    const message = `Resource with ID :${err.value} does not exist`;
    error = new ErrorResponse(message, 404);
  }
  //duplicate key entry error
  if (err.code === 11000) {
    const message = "Resource already exists";
    error = new ErrorResponse(message, 409);
  }
  res
    .status(error.statusCode || 500)
    .json({ success: false, error: error.message || "Server Error" });
};

module.exports = errorHandler;
