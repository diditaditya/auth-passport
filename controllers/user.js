const User = require('../models/user.js');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwtHelper = require('../helpers/helper');
const jwt = require('jsonwebtoken');

var pvtKey = "secret";

let userControl = {
  create: (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    let role = req.body.role;
    if (username && password && role) {
      bcrypt.hash(password, saltRounds,(err, hash) => {
        if (err) {
          res.send(err);
        } else {
          let user = new User({
            username: username,
            password: hash,
            role: role
          });
          user.save((err) => {
            if(err) {
              res.send(err);
            } else {
              res.send('user is successfully created');
            }
          });
        }
      });
    } else {
      res.send('username, password, role must not be empty');
    }
  },
  signup: (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    let role = req.body.role;
    if (username && password && role) {
      bcrypt.hash(password, saltRounds,(err, hash) => {
        if (err) {
          res.send(err);
        } else {
          let user = new User({
            username: username,
            password: hash,
            role: role
          });
          user.save((err) => {
            if(err) {
              res.send(err);
            } else {
              res.send('user is successfully created');
            }
          });
        }
      });
    } else {
      res.send('username, password, role must not be empty');
    }
  },
  signin: (req, res) => {
    if (req.user.message) {
      res.send(req.user);
    } else if (req.user.username) {
      let username = req.user.username;
      let role = req.user.role;
      let user = {
        username: username,
        role: role
      };
      let token = jwt.sign(user, pvtKey, {expiresIn: '1h'});
      res.send({message: 'sign in is successful', user: user, token: token});
    } else {
      res.send({message: 'incorrect username or passoword'});
    }
  }
}

module.exports = userControl;
