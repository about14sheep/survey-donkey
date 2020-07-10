const express = require('express');
const app = express();
const {Survey,Question,User} = require('./models');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const csurf = require('csurf');

const csrfProtection = csurf({cookie: true})
const asyncHandler = (handler) => (req,res,next) => handler(req,res,next).catch(next);

app.use(cookieParser())
app.use(bodyParser.urlencoded({extended: false}))
app.set('view engine','pug')


