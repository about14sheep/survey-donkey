const express = require('express')
const { check, validationResult } = require('express-validator')
const db = require('../models');
const { csrfProtection, asyncHandler } = require('./utils');

const router = express.Router()


router.get('/surveys/preview/:id', asyncHandler(async (req, res) => {
    const survey = await db.Survey.findByPk(parseInt(req.params.id, 10), { include: { model: db.Question } });
    const questions = await db.Question.findAll({ where: { surveyId: parseInt(req.params.id, 10) } })
    const responses = questions.map(el => JSON.stringify(el));
    res.status(200)
    res.send(responses);
}));

router.get('/surveys/create', csrfProtection, asyncHandler(async (req, res) => {
    res.render('name-survey', {
        title: 'New Survey',
        token: req.csrfToken()
    })
}))

router.post('/surveys/create', csrfProtection, asyncHandler(async (req, res) => {
    const newSurvey = await db.Survey.create({
        name: req.body.surveyName,
        userId: 1,
        published: false,
    })
    res.redirect(`/surveys/create/${newSurvey.id}`)
}))

router.get('/surveys/create/:id', csrfProtection, asyncHandler(async (req, res) => {
    const survey = await db.Survey.findByPk(req.params.id)
    res.render('create-new-survey', { title: 'Create Survey', name: survey.name, token: req.csrfToken(), surveyId: req.params.id })
}))

router.post('/surveys/create/:id', csrfProtection, asyncHandler(async (req, res) => {
    const question = await db.Question.create({
        questionText: req.body.prompt,
        surveyId: req.body.surveyId,
        questionType: req.body.questionType,
        opOne: req.body.opOne,
        opTwo: req.body.opThree,
        opThree: req.body.opFour,
        opFive: req.body.opFive
    })
    res.status(200)
    res.send('goooood')
}))

router.get('/surveys/:id', asyncHandler(async (req, res) => {
    const survey = await db.Survey.findByPk(parseInt(req.params.id, 10), { include: { model: db.Question } });
    res.render('results', { title: `Survey #${parseInt(req.params.id, 10)}`, survey });
}));

router.get('/surveys/:id/questions/:qid', asyncHandler(async (req, res) => {
    const surveyResponses = await db.QuestionResponse.findAll({ where: { surveyId: parseInt(req.params.id, 10), questionId: parseInt(req.params.qid, 10) }, include: { model: db.Question } });
    res.send(surveyResponses)
}))


module.exports = router;
