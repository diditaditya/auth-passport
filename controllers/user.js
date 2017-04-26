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
  signin: (username, password, next) => {
    let findUser = User.findOne({username: username}, (err, user) => {
      if (err || user === null) {
        next(null, {message: 'username is not found'});
      } else {
        bcrypt.compare(password, user.password, (err, resolve) => {
          if (err) {
            next(err);
          } else {
            if (resolve) {
              let token = jwt.sign(user, pvtKey, {expiresIn: '1h'});
              next(null, {message: 'successfully signed in', user:user, token:token});
            } else {
              next(null, {message: 'password is incorrect'});
            }
          }
        });
      }
    });
  }
}

module.exports = userControl;
