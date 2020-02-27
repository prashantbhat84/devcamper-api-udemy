const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const User = require("../models/User");
const sendEmail = require("../utils/sendmail");
const crypto = require("crypto");
//@desc  Register user
//@method  POST /api/v1/auth/register
//@access   public
exports.registerUser = asyncHandler(async (req, res, next) => {
  const { name, email, password, role } = req.body;

  //create user
  const user = await User.create({ name, email, password, role });
  // // create token.
  // const token = user.getSignedJWTToken();
  // res.status(200).json({ success: true, token });
  sendToken(user, 200, res);
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
  // const token = user.getSignedJWTToken();
  // res.status(200).json({ success: true, token });
  sendToken(user, 200, res);
});
//@desc  Logout User /clear cookie
//@method  GET /api/v1/auth/logout
//@access   private
exports.logout = asyncHandler(async (req, res, next) => {
  res.cookie("token", "none", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true
  });
  res.status(200).json({ success: true });
});

//@desc  get current logged in user
//@method  GET /api/v1/auth/me
//@access   private
exports.getme = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  res.status(200).json({ success: true, User: user });
});

//@desc  Forgot Password
//@method  POST /api/v1/auth/forgotpassword
//@access   public
exports.forgotPassword = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  // check weather user exists in DB
  if (!user) {
    return next(
      new ErrorResponse(`User with ${req.body.email} does not exist`, 404)
    );
  }
  const resetToken = user.getResetPasswordToken();
  await user.save({ validateBeforeSave: false });
  // create reset url
  const resetUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/resetpassword/${resetToken}`;
  const message = `You are receiving this email because you or someone else requested the reset of a password.Please make a put request to :\n\n ${resetUrl}`;
  try {
    await sendEmail({ email: user.email, subject: "Password Reset", message });
    res.status(200).json({ success: true });
  } catch (err) {
    console.log(err);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({ validateBeforeSave: false });
    return next(new ErrorResponse(`Email could not be sent`, 500));
  }
});

//@desc  Reset Password
//@method  PUT /api/v1/auth/resetPasword/:resetToken
//@access   public
exports.resetPassword = asyncHandler(async (req, res, next) => {
  //get hashed  token
  const resetpasswordtoken = crypto
    .createHash("sha256")
    .update(req.params.resettoken)
    .digest("hex");
  const user = await User.findOne({
    resetPasswordToken: resetpasswordtoken,
    resetPasswordExpire: { $gt: Date.now() }
  });
  if (!user) {
    return next(new ErrorResponse("Invalid Token", 400));
  }
  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save();

  sendToken(user, 200, res);
});

//@desc  Update user details
//@method  PUT /api/v1/auth/updatedetails
//@access   private
exports.updateUserDetails = asyncHandler(async (req, res, next) => {
  const fieldsToUpdate = {
    name: req.body.name,
    email: req.body.email
  };
  const user = await User.findByIdAndUpdate(req.user.id, fieldsToUpdate, {
    new: true,
    runValidators: true
  });
  // check weather user exists in DB
  if (!user) {
    return next(
      new ErrorResponse(`User with ${req.body.email} does not exist`, 404)
    );
  }
  res.status(200).json({ success: true, User: user });
});

//@desc  update logged inuser password
//@method  PUT /api/v1/auth/updatepassword
//@access   private
exports.updatePassword = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");
  //check currentpassword
  if (!(await user.matchPassword(req.body.currentpassword))) {
    return next(new ErrorResponse(`Current password does not match.`, 401));
  }
  user.password = req.body.newpassword;
  await user.save();
  sendToken(user, 200, res);
});

//get token from model  create cookie and send response.
const sendToken = (user, statusCode, res) => {
  // create token.
  const token = user.getSignedJWTToken();
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
    .status(statusCode)
    .cookie("token", token, options)
    .json({ success: true, token });
};
