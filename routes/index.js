const express = require('express');
const router = express.Router();
const userControl = require('../controllers/user.js');
const passport = require('passport');

// test page
router.get('/', (req, res) => {
  res.send('Up and running');
});

router.post('/api/signin', passport.authenticate('local', {session: false}), userControl.signin);

router.post('/api/users', userControl.create);

module.exports = router;
