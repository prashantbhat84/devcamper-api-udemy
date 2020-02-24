const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const User = require("../models/User");

//@desc  Get All Users
//@method  GET /api/v1/users
//@access   private/admin access
exports.getUsers = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

//@desc  Get individual user
//@method  GET /api/v1/users/:id
//@access   private/admin access
exports.getUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(new ErrorResponse(`No User exists for id ${req.params.id}`));
  }
  res.status(200).json({ success: true, data: user });
});
//@desc  Create User
//@method  POST /api/v1/users/
//@access   private/admin access
exports.createUser = asyncHandler(async (req, res, next) => {
  const user = User.create(req.body);

  res.status(201).json({ success: true, data: user });
});
//@desc  Update User
//@method  PUT /api/v1/users/:id
//@access   private/admin access
exports.updateUser = asyncHandler(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    data: user
  });
});
//@desc  delete User
//@method  DELETE /api/v1/users/:id
//@access   private/admin access
exports.deleteUser = asyncHandler(async (req, res, next) => {
  await User.findByIdAndDelete(req.params.id);

  res.status(200).json({
    success: true,
    data: {}
  });
});
