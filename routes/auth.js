const express = require("express");

const router = express.Router();
const {
  registerUser,
  loginUser,
  getme,
  forgotPassword,
  resetPassword,
  updateUserDetails,
  updatePassword,
  logout
} = require("../controller/auth");
const { protectRoute } = require("../middleware/auth");

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/me").get(protectRoute, getme);
router.route("/forgotpassword").post(forgotPassword);
router.route("/resetpassword/:resettoken").put(resetPassword);
router.route("/updatedetails").put(protectRoute, updateUserDetails);
router.route("/updatepassword").put(protectRoute, updatePassword);
router.route("/logout").get(protectRoute, logout);
module.exports = router;
