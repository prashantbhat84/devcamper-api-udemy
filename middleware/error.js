const ErrorResponse = require("../utils/errorResponse");
const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;
  //mongoose bad object id
  console.log(err.name);
  if (err.name == "CastError") {
    const message = `Bootcamp not found with ID :${err.value}`;
    error = new ErrorResponse(message, 404);
  }

  res
    .status(error.statusCode || 500)
    .json({ success: false, error: error.message || "Server Error" });
};
module.exports = errorHandler;
