const jwt = require('jsonwebtoken');
const UserModel = require('../models/user.model');

module.exports.checkUser = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.TOKEN_JWT, async (err, decodedToken) => {
      if (err) {
        res.locals.user = null;
        next();
      } else {
        console.log('decodedtoken : ' + decodedToken.id);
        let user = await UserModel.findById(decodedToken.id);
        res.locals.user = user;

        console.log(res.locals.user);
        next();
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
};

module.exports.requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, `${process.env.TOKEN_JWT}`, async (err, decodedToken) => {
      if (err) {
        console.log(err);
        res.send(200).json({ message: 'erreur' });
      } else {
        console.log(decodedToken);
        next();
      }
    });
  } else {
    res.sendStatus(401).json();
    console.log('no token');
  }
};
