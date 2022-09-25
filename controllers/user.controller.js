const UserModel = require('../models/user.model');
const ObjectID = require('mongoose').Types.ObjectId;

module.exports.getAllUsers = async (req, res) => {
  const users = await UserModel.find().select('-password');
  res.status(200).json(users);
};

module.exports.userInfo = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send('ID inconnue :' + req.params.id);

  UserModel.findById(req.params.id, (err, data) => {
    if (!err) res.send(data);
    else console.log('ID inconnue : ' + err);
  }).select('-password');
};

module.exports.deleteUser = async (req, res) => {
  console.log(req.params.id);
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send('ID inconnue :' + req.params.id);

  try {
    await UserModel.deleteOne({ _id: req.params.id }).exec();
    res.status(200).json({ message: 'Succès de la supression' });
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};
