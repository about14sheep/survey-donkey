const express = require("express");
const router = express.Router();
const {requireAuth} = require('../auth')
const db = require("../models");
const { Op } = require("sequelize");
const { csrfProtection, asyncHandler } = require('./utils');
// const { owner, name, created, modified, question, options } = require('../public/scripts/feed.js')

router.get('/feed', asyncHandler(async (req, res) => {



let feedSurveys = await db.Survey.findAll({ include: [db.Question, db.User, db.Upvote] });
  res.render('feed', {
    title: "SurveyDonkey Feed",
    feedSurveys,

})
;

}))

  module.exports = router;
