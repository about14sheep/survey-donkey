const express = require('express');
const app = express();
require('dotenv').config();
const morgan = require('morgan');
const { Survey, Question, User } = require('./models');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const csurf = require('csurf');
const session = require('express-session')
const { sessionSecret } = require('./config/index.js');
// const surveyRouter = require('./routes/survey-router');
const signUpRouter = require('./routes/sign-up');
const loginRouter = require('./routes/login');
const dashRouter = require('./routes/dashboard');
const logoutRouter = require('./routes/logout')
const { restoreUser } = require('./auth');

const csrfProtection = csurf({ cookie: true })
const asyncHandler = (handler) => (req, res, next) => handler(req, res, next).catch(next);


// app.use(surveyRouter)
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

app.use(signUpRouter);
app.use(loginRouter);
app.use(dashRouter);
app.use(logoutRouter);

app.get('/', (req, res) => {
    res.render('splash')
})

const port = 8080;
app.listen(port, _ => console.log(`Listening on port ${port}...`));
