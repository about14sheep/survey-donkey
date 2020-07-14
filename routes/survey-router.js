const express = require('express');
const router = express.Router();
const db = require('../models');
const { asyncHandler } = require('./utils');

router.get('/surveys/:id', asyncHandler(async (req, res) => {
    const survey = await db.Survey.findByPk(parseInt(req.params.id, 10), { include: { model: db.Question } });
    const surveyResponses = await db.QuestionResponse.findAll({ where: { surveyId: parseInt(req.params.id, 10) } });
    surveyResponses.map(el => console.log(el.questionResponseValue));
    res.render('results', { title: `Survey #${parseInt(req.params.id, 10)}`, survey, surveyResponses });
}));


module.exports = router;