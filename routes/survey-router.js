const express = require('express')
const { check, validationResult } = require('express-validator')
const db = require('../models');
const { csrfProtection, asyncHandler } = require('./utils');
const { requireAuth } = require('../auth');

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
        opTwo: req.body.opTwo,
        opThree: req.body.opThree,
        opFour: req.body.opFour,
        opFive: req.body.opFive,
    })
    res.status(200)
    res.send('goooood')
}))

router.post('/surveys/questions/:id', csrfProtection, asyncHandler(async (req, res) => {
    console.log("hello")
    console.log(req.body)
    console.log(req.body.questionId)
    db.Question.destroy({ where: { id: req.body.questionId } })
    res.status(200)
    res.send('question-deleted')
}))

router.get('/surveys/:id', requireAuth, csrfProtection, asyncHandler(async (req, res) => {
    const survey = await db.Survey.findByPk(parseInt(req.params.id, 10), { include: { model: db.Question } });
    const userResponses = await db.QuestionResponse.findAll({ where: { surveyId: parseInt(req.params.id, 10), userId: parseInt(req.session.auth.userId) } });
    const votes = await db.Upvote.findAll({ where: { surveyId: parseInt(req.params.id, 10) } });
    const userVote = await db.Upvote.findAll({ where: { surveyId: parseInt(req.params.id, 10), userId: parseInt(req.session.auth.userId) } });
    const usersArr = userResponses.map(el => parseInt(el.questionId, 10));
    res.render('results', { title: `Survey #${parseInt(req.params.id, 10)}`, token: req.csrfToken(), survey, usersArr, votes, userVote });
}));

router.get('/surveys/:id/questions/:qid', csrfProtection, asyncHandler(async (req, res) => {
    const surveyResponses = await db.QuestionResponse.findAll({ where: { surveyId: parseInt(req.params.id, 10), questionId: parseInt(req.params.qid, 10) }, include: { model: db.Question } });
    res.send(surveyResponses)
}));

router.post('/surveys/:id/questions/:qid', csrfProtection, asyncHandler(async (req, res) => {
    const response = await db.QuestionResponse.create({
        surveyId: req.params.id,
        userId: parseInt(req.session.auth.userId),
        questionId: req.params.qid,
        questionResponseValue: req.body.responseText.toLowerCase()
    });
    res.status(200)
    res.send('response updated')
}));

router.post('/surveys/delete/:id', asyncHandler(async (req, res) => {
    const surveyId = parseInt(req.params.id, 10);
    const survey = await db.Survey.findByPk(surveyId);
    await survey.destroy();
    res.redirect('back');
}));

router.get('/surveys/:id/votes', asyncHandler(async (req, res) => {
    const votes = await db.Upvote.findAll({ where: { surveyId: parseInt(req.params.id, 10) } });
    res.send(votes);
}));

router.post('surveys/:id/votes', asyncHandler(async (req, res) => {
    const vote = await db.Upvote.create({
        suveyId: parseInt(req.params.id, 10),
        userId: parseInt(req.body.userId, 10),
        upvote: parseInt(req.body.upvote, 10),
        downvote: parseInt(req.body.downvote, 10)
    })
}))


module.exports = router;
