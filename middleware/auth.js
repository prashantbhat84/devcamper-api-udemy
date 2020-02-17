const jwt = require("jsonwebtoken");
const asyncHandler = require("./async");
const errorResponse = require("../utils/errorResponse");
const User = require("../models/User");

exports.protect = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  //   else if(req.cookies.token){
  //            token=req.cookies.token;
  //   }
  //make sure token is recived
  if (!token) {
    return next(new errorResponse("Not authorised to access this route", 401));
  }
  try {
  } catch (error) {}
});
