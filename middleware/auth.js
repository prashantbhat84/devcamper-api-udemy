const jwt = require("jsonwebtoken");
const asyncHandler = require("./async");
const errorResponse = require("../utils/errorResponse");
const User = require("../models/User");
//protect routes

exports.protectRoute = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    // set token from headers
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.token) {
    // set token from cookie
    console.log("cookie exists");
    token = req.cookies.token;
  }

  //make sure token exists
  if (!token) {
    return next(new errorResponse("Not Authorised to access this route", 401));
  }
  // verfiy token
  try {
    const decodedtoken = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decodedtoken.id);
    next();
  } catch (error) {
    return next(new errorResponse("Not Authorised to access this route", 401));
  }
});

//grant access to specific roles
exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new errorResponse(
          `User role ${req.user.role} is not authorized to access this route`,
          403
        )
      );
    }
    next();
  };
};
