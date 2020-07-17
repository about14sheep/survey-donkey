const express = require("express");
const router = express.Router();
const {requireAuth} = require('../auth')
const db = require("../models");
const { Op } = require("sequelize");
const { csrfProtection, asyncHandler } = require('./utils');


router.get('/feed', asyncHandler(async (req, res) => {

const nameFeedSurveys = await db.Survey.findAll({ include: ['User'],
order: [['name', 'ASC']] });

res.render('feed', {
    title: "SurveyDonkey Feed",
    name: true,
    nameFeedSurveys, 
    
})
;

}))

router.get('/feed/created', asyncHandler(async (req, res) => {

const createFeedSurveys = await db.Survey.findAll({ include: ['User'],
order: [['createdAt', 'ASC']] });


res.render('feed', {
    title: "SurveyDonkey Feed",
    cre: true,
    createFeedSurveys
    
})
;

}))


router.get('/feed/modified', asyncHandler(async (req, res) => {

const  modFeedSurveys = await db.Survey.findAll({ include: ['User'],
order: [['updatedAt', 'ASC']] });

res.render('feed', {
    title: "SurveyDonkey Feed",
    mod: true,
    modFeedSurveys
})
;

}))

router.get('/feed/name', asyncHandler(async (req, res) => {
  
const nameFeedSurveys = await db.Survey.findAll({ include: ['User'],
order: [['name', 'ASC']] });

res.render('feed', {
    title: "SurveyDonkey Feed",
    name: true,
    nameFeedSurveys, 
    
})
;

}))

  module.exports = router;