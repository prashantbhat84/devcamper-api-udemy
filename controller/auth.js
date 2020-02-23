const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const User = require("../models/User");

//@desc  Register user
//@method  POST /api/v1/auth/register
//@access   public
exports.registerUser = asyncHandler(async (req, res, next) => {
  const { name, email, password, role } = req.body;

  //create user
  const user = await User.create({ name, email, password, role });
  // create token.
  const token = user.getSignedJWTToken();
  res.status(200).json({ success: true, token });
});
//@desc  login user
//@method  POST /api/v1/auth/login
//@access   public
exports.loginUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  //validate email and password
  if (!email || !password) {
    return next(new ErrorResponse(`Please provide an email and password`, 400));
  }

  //create user
  const user = await User.findOne({ email }).select("+password");
  // check weather user exists in DB
  if (!user) {
    return next(new ErrorResponse(`Invalid Credentials`, 401));
  }
  //check if password match
  const isMatched = await user.matchPassword(password);
  if (!isMatched) {
    return next(new ErrorResponse(`Invalid Credentials`, 401));
  }

  // create token.
  const token = user.getSignedJWTToken();
  res.status(200).json({ success: true, token });
});
