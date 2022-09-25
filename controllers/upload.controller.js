const UserModel = require('../models/user.model');
const fs = require('fs');
const { promisify } = require('util');
const pipeline = promisify(require('stream').pipeline);
const { uploadErrors } = require('../utils/errors.utils');

module.exports.uploadProfil = (req, res) => {
  try {
    if (
      req.file.detectedMimeType !== 'image/jpg' &&
      req.file.detectedMimeType !== 'image/png' &&
      req.file.detectedMimeType !== 'image/jpeg'
    )
      throw Error('Fichier invalide !');

    if (req.file.size > 1000000) throw Error('Taille maximal !');
  } catch (err) {
    const errors = uploadErrors(err);
    return res.status(201).json({ errors });
  }

  const fileName = req.body.name + '.jpg';

  pipeline(
    req.file.stream,
    fs.createWriteStream(
      `${__dirname}/../client/public/uploads/profil/${fileName}`
    )
  );

  try {
    UserModel.findByIdAndUpdate(
      req.body.userId,
      { $set: { picture: './uploads/profil/' + fileName } },
      { new: true, upsert: true, setDefaultsOnInsert: true },
      (err, data) => {
        if (!err) return res.send(data);
        else return res.status(500).send({ message: err });
      }
    );
  } catch (err) {
    return res.status(500).send({ message: err });
  }
};
