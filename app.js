const express = require('express');
const app = express();
const {Survey,Question,User} = require('./models');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const csurf = require('csurf');
const surveyRouter = require('./routes/survey-router')

const csrfProtection = csurf({cookie: true})
const asyncHandler = (handler) => (req,res,next) => handler(req,res,next).catch(next);

app.use(surveyRouter)
app.use(cookieParser())
app.use(bodyParser.urlencoded({extended: false}))
app.set('view engine','pug')


