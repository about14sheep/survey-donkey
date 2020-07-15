const express = require("express");
const router = express.Router();
const {requireAuth} = require('../auth')
const db = require("../models");
const { Op } = require("sequelize");
const { csrfProtection, asyncHandler } = require('./utils');


router.get('/dashboard', requireAuth, asyncHandler(async (req, res) => {
    const ownedSurveys = await db.Survey.findAll({
        where: {
            userId: {
                [Op.eq]: res.locals.user.id
            }
        }
    });
    const drafts= ownedSurveys.filter(el => el.published === false)
    res.render('dashboard', {
        title: "SurveyDonkey Dashboard",
        ownedSurveys,
        drafts
    });
}));

module.exports = router;
