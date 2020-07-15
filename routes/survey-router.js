const express = require('express');
const router = express.Router();
const db = require('../models');
const { requireAuth } = require('../auth')
const { asyncHandler } = require('./utils');

router.get('/surveys/:id', asyncHandler(async (req, res) => {
    const survey = await db.Survey.findByPk(parseInt(req.params.id, 10), { include: { model: db.Question } });
    res.render('results', { title: `Survey #${parseInt(req.params.id, 10)}`, survey });
}));

router.get('/surveys/:id/responses', asyncHandler(async (req, res) => {
    const surveyResponses = await db.QuestionResponse.findAll({ where: { surveyId: parseInt(req.params.id, 10) }, include: { model: db.Question } });
    res.send(surveyResponses)
}))


module.exports = router;