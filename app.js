const express = require('express');
const app = express();
require('dotenv').config();
const morgan = require('morgan');
const { Survey, Question, User, QuestionResponse } = require('./models');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const csurf = require('csurf');
const session = require('express-session')
const { sessionSecret } = require('./config/index.js');
const surveyRouter = require('./routes/survey-router');
const signUpRouter = require('./routes/sign-up');
const loginRouter = require('./routes/login');
const dashRouter = require('./routes/dashboard');
const logoutRouter = require('./routes/logout')
const { restoreUser } = require('./auth');

const csrfProtection = csurf({ cookie: true })
const asyncHandler = (handler) => (req, res, next) => handler(req, res, next).catch(next);


app.use(express.static('public'))
app.use(cookieParser(sessionSecret))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(morgan('dev'));
app.set('view engine', 'pug')

app.use(session({
    name: 'survey.sid',
    secret: sessionSecret,
    resave: false,
    saveUninitialized: false,
}));
app.use(restoreUser);

app.use(surveyRouter);
app.use(signUpRouter);
app.use(loginRouter);
app.use(dashRouter);
app.use(logoutRouter);


app.get('/', (req, res) => {
    res.render('splash')
})

app.get('/surveys/:id', asyncHandler(async (req, res) => {
    const survey = await Survey.findByPk(parseInt(req.params.id, 10), { include: { model: Question } });
    const surveyResponses = await QuestionResponse.findAll({ where: { surveyId: parseInt(req.params.id, 10) } });
    surveyResponses.map(el => console.log(el.questionResponseValue));
    res.render('results', { title: `Survey #${parseInt(req.params.id, 10)}`, survey, surveyResponses });
}));

const port = Number.parseInt(process.env.PORT, 10) || 8081;
app.listen(port, () => {
    console.log(`Listening for requests on port ${port}...`);
});