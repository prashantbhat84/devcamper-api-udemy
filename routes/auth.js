const express = require("express");
const Router = express.Router();

const { registerUser, login } = require("../controllers/auth");

Router.post("/register", registerUser);
Router.post("/login", login);

module.exports = Router;
