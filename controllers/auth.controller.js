const UserModel = require('../models/user.model');
const jwt = require('jsonwebtoken');

const maxAge = 86400000;

const createToken = (id, isAdmin) => {
  return jwt.sign({ id, isAdmin }, process.env.TOKEN_JWT, {
    expiresIn: maxAge,
  });
};

//S'inscrire

module.exports.signUp = async (req, res) => {
  const { pseudo, email, password } = req.body;

  try {
    const user = await UserModel.create({ pseudo, email, password });
    res.status(201).json({ user: user._id });
  } catch (err) {
    if (err) {
      res.status(401).json({
        error: 'Les informations remplies ne sont pas correctes',
      });
    }
  }
};

//Se connecter

module.exports.signIn = async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  try {
    const user = await UserModel.login(email, password);

    const token = createToken(user._id, user.isAdmin);

    res
      .cookie('jwt', token)
      .status(200)
      .json({ user: user._id, isAdmin: user.isAdmin });
  } catch (err) {
    if (err) {
      res.status(401).json({
        error: `L'e-mail ou le mot de passe ne correspondent pas !`,
      });
    }
  }
};

//Déconnexion

module.exports.logout = (req, res) => {
  res.cookie('jwt', '', { maxAge: 1 });
  res.redirect('/');
};
