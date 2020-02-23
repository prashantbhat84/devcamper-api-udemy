const express = require("express");

const router = express.Router();
const { registerUser, loginUser, getme } = require("../controller/auth");
const { protectRoute } = require("../middleware/auth");

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/me").get(protectRoute, getme);

module.exports = router;
