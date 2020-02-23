const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const User = require("../models/User");

//@desc  Register user
//@method  POST /api/v1/auth/users
//@access   public
exports.registerUser = asyncHandler(async (req, res, next) => {
  const { name, email, password, role } = req.body;

  //create user
  const user = await User.create({ name, email, password, role });
  res.status(200).json({ success: true });
});
