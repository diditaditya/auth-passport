const jwt = require('jsonwebtoken');
const pvtKey = "rahasia";

let jwtHelper = {
  verifyUser: (req, res, next) => {
    jwt.verify(req.headers.token, pvtKey, (err, decoded) => {
      if (decoded) {
        next();
      } else {
        res.send('Incorrect Token');
      }
    });
  },
  verifyAdmin: (req, res, next) => {
    jwt.verify(req.headers.token, pvtKey, (err, decoded) => {
      if (decoded) {
        if (decoded.role === "admin") {
          next();
        } else {
          res.send('You are not authorized');
        }
      } else {
        res.send('Incorrect Token');
      }
    });
  }
}

module.exports = jwtHelper;
