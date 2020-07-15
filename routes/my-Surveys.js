const express = require("express");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const { loginUser } = require('../auth');

const db = require("../models");
const { csrfProtection, asyncHandler } = require("./utils");

const router = express.Router();

router.get("/my-Surveys", csrfProtection, (req, res) => {
  res.render("my-Surveys", {
    mySurveys: true,
    title: "Login",
    csrfToken: req.csrfToken(),
  });
});

module.exports = router;