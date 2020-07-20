const express = require("express");
const router = express.Router();
const {requireAuth} = require('../auth')
const db = require("../models");
const { Op } = require("sequelize");
const { csrfProtection, asyncHandler } = require('./utils');


router.get('/feed', requireAuth, asyncHandler(async (req, res) => {

    const nameFeedSurveys = await db.Survey.findAll({ include: [db.Question, db.User, db.Upvote],
        order: [['name', 'ASC']]
    });

    res.render('feed', {
        title: "SurveyDonkey Feed",
        nameFeedSurveys,
    })
}))

router.get('/feed/name', requireAuth, asyncHandler(async (req, res) => {

    const nameFeedSurveys = await db.Survey.findAll({ include: [db.Question, db.User, db.Upvote],
        order: [['name', 'ASC']]
    });

    res.render('feed', {
        title: "SurveyDonkey Feed",
        nameFeedSurveys,
    })
}))

router.get('/feed/created', asyncHandler(async (req, res) => {

    const createFeedSurveys = await db.Survey.findAll({ include: [db.Question, db.User, db.Upvote],
        order: [['createdAt', 'ASC']]
    });

    res.render('feed', {
        title: "SurveyDonkey Feed",
        createFeedSurveys
    })
}))

router.get('/feed/upvotes', asyncHandler(async (req, res) => {

    const upFeedSurveys = await db.Survey.findAll({
        include: [db.Question, db.User, db.Upvote]
    });
    
    const uppedVoted = () => { 
        const upFeedArray = [];

        upFeedArray.push(upFeedSurveys)
        return upFeedArray[0].sort(upFeedArray[0].Upvote.length)
       
    }

const upped = uppedVoted()
    

    res.render('feed', {
        upfeed: true,
        title: "SurveyDonkey Feed",
        upFeedSurveys,
        upped
    })
}))


router.get('/feed/modified', asyncHandler(async (req, res) => {

    const  modFeedSurveys = await db.Survey.findAll({ include: [db.Question, db.User, db.Upvote],
        order: [['updatedAt', 'ASC']]
    });

    res.render('feed', {
        title: "SurveyDonkey Feed",
        modFeedSurveys
    })
}))




module.exports = router;
