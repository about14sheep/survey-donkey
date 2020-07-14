const express = require('express')
const {check, validationResult} = require('express-validator')
const db = require('../models');
const {csrfProtection, asyncHandler} = require('./utils');

const router = express.Router()

router.get('/surveys/create',csrfProtection, asyncHandler( async(req,res) =>{
    res.render('name-survey', {
        title: 'New Survey',
        token: req.csrfToken()
    })
}))

router.post('/surveys/create',csrfProtection, asyncHandler(async (req,res)=>{
    console.log("sdafasdf",req.body.surveyName)
    const newSurvey = await db.Survey.create({
        name: req.body.surveyName,
        userId: 1,
        published: false,
    })
    res.redirect(`/surveys/create/${newSurvey.id}`)
}))

router.get('/surveys/create/:id', csrfProtection, asyncHandler( async (req,res)=>{
    const survey = await db.Survey.findByPk(req.params.id)
    console.log(req.params.id)
    res.render('create-new-survey', {title:'Create Survey',name: survey.name, token:req.csrfToken(),surveyId: req.params.id})
}))

router.post('/surveys/create/:id',csrfProtection, asyncHandler(async (req,res)=>{
    console.log(req.body)
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
    res.send('somestring')
}))

module.exports = router
