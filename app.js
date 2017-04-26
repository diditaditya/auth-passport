const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const Strategy = require('passport-local').Strategy;
const userControl = require('./controllers/user.js');
const userAuth = require('./helpers/passport.js');

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/authPassport');

const app = express();

var index = require('./routes/index');

app.use(bodyParser.urlencoded({ extended: false }));

passport.use(new Strategy(userAuth));

app.use(passport.initialize());

app.use('/', index);

app.listen(3000);

module.exports = app;
