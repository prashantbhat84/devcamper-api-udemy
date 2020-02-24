const express = require("express");
const advancedResults = require("../middleware/advancedResults");
const User = require("../models/User");
//protect route middleware
const { protectRoute, authorize } = require("../middleware/auth");

const router = express.Router();
const {
  createUser,
  updateUser,
  deleteUser,
  getUser,
  getUsers
} = require("../controller/users");

router.use(protectRoute);
router.use(authorize("admin"));
router
  .route("/")
  .get(advancedResults(User), getUsers)
  .post(createUser);

router
  .route("/:id")
  .get(getUser)
  .put(updateUser)
  .delete(deleteUser);

module.exports = router;
