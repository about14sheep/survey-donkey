const express = require('express');
const app = express();
const { Survey, Question, User } = require('./models');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const csurf = require('csurf');
const surveyRouter = require('./routes/survey-router')
// const signUpRouter = require('./routes/sign-up')

const csrfProtection = csurf({ cookie: true })
const asyncHandler = (handler) => (req, res, next) => handler(req, res, next).catch(next);


//app.use(surveyRouter)
app.use(express.static('public'))
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: false }))
app.set('view engine', 'pug')

// app.use(signUpRouter);

app.get('/', (req, res) => {
    res.render('splash')
})

const port = Number.parseInt(process.env.PORT, 10) || 8081;
app.listen(port, () => {
  console.log(`Listening for requests on port ${port}...`);
});