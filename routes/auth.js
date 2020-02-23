const express = require("express");

const router = express.Router();
const {
  registerUser,
  loginUser,
  getme,
  forgotPassword,
  resetPassword,
  updateUserDetails
} = require("../controller/auth");
const { protectRoute } = require("../middleware/auth");

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/me").get(protectRoute, getme);
router.route("/forgotpassword").post(forgotPassword);
router.route("/resetpassword/:resettoken").put(resetPassword);
router.route("/updatedetails").put(protectRoute, updateUserDetails);
module.exports = router;
