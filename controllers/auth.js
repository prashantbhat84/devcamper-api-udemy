const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const User = require("../models/User");

//@desc  register a user
//@route   post /api/v1/auth/register
//@access  public
exports.registerUser = asyncHandler(async (req, res, next) => {
  const { name, email, password, role } = req.body;
  //create user

  const user = await User.create({ name, email, password, role });
  //send token with cookie and response
  sendTokenResponse(user, 200, res);
});
//@desc  login a user
//@route   post /api/v1/auth/login
//@access  public
exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  //validate email and pasword
  if (!email || !password) {
    return next(
      new ErrorResponse("Please Provide  an Email and Password", 400)
    );
  }
  //check for user
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorResponse(`Invalid credentials`, 401));
  }
  //check for password match
  const isMatch = await user.checkPassword(password);
  if (!isMatch) {
    return next(new ErrorResponse(`Invalid credentials`, 401));
  }

  // send response with cookie
  sendTokenResponse(user, 200, res, req);
});

// get token from model create cookie and send response.
const sendTokenResponse = (user, statuscode, res, req) => {
  //create jwt token
  const token = user.getSignedJwtToken();
  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true
  };
  if (process.env.NODE_ENV === "production") {
    options.secure = true;
  }
  res
    .status(statuscode)
    .cookie("token", token, options)
    .json({ success: true, token });
};
