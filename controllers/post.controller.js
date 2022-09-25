const postModel = require('../models/post.model');
const PostModel = require('../models/post.model');
const UserModel = require('../models/user.model');
const { uploadErrors } = require('../utils/errors.utils');
const ObjectID = require('mongoose').Types.ObjectId;
const fs = require('fs');
const { promisify } = require('util');
const pipeline = promisify(require('stream').pipeline);

//Lire les posts

module.exports.readPost = (req, res) => {
  PostModel.find((err, data) => {
    if (!err) res.send(data);
    else console.log('Erreur de récupération des données :' + err);
  }).sort({ createAt: -1 });
};

//Crée un post

module.exports.createPost = async (req, res) => {
  let fileName;

  if (req.file !== null) {
    try {
      if (
        req.file.detectedMimeType !== 'image/jpg' &&
        req.file.detectedMimeType !== 'image/png' &&
        req.file.detectedMimeType !== 'image/jpeg'
      )
        throw Error('Fichier invalide !');
      if (req.file.size > 1000000) throw Error('Taille maximal !');
    } catch (err) {
      console.log(err);
      const errors = uploadErrors(err);
      return res.status(201).json({ errors });
    }

    fileName = req.body.posterId + Date.now() + '.jpg';

    pipeline(
      req.file.stream,
      fs.createWriteStream(
        `${__dirname}/../client/public/uploads/posts/${fileName}`
      )
    );
  }
  const newPost = new postModel({
    posterId: req.body.posterId,
    message: req.body.message,
    picture: req.file !== null ? './uploads/posts/' + fileName : '',
    likers: [],
  });

  try {
    const post = await newPost.save();
    return res.status(201).json(post);
  } catch (err) {
    return res.status(400).send(err);
  }
};

//Modifier un post

module.exports.updatePost = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send('ID inconnue :' + req.params.id);

  const updateRecord = {
    message: req.body.message,
  };

  PostModel.findByIdAndUpdate(
    req.params.id,
    { $set: updateRecord },
    { new: true },
    (err, data) => {
      if (!err) res.send(data);
      else console.log('Update error :' + err);
    }
  );
};

//Supprimer un post

module.exports.deletePost = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send('ID inconnue :' + req.params.id);

  PostModel.findByIdAndRemove(req.params.id, (err, data) => {
    if (!err) res.send(data);
    else console.log('Erreur lors de la tentative de supression :' + err);
  });
};

//Aimer un post

module.exports.likePost = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send('ID inconnue :' + req.params.id);

  try {
    PostModel.findByIdAndUpdate(
      req.params.id,
      {
        $addToSet: { likers: req.body.id },
      },
      { new: true },
      (err, data) => {
        if (err) return res.status(400).send(err);
      }
    );
    UserModel.findByIdAndUpdate(
      req.body.id,
      {
        $addToSet: { likes: req.params.id },
      },
      { new: true },
      (err, data) => {
        if (!err) res.send(data);
        else return res.status(400).send(err);
      }
    );
  } catch (err) {
    return res.status(400).send(err);
  }
};

//Ne plus aimer un post

module.exports.unlikePost = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send('ID inconnue :' + req.params.id);

  try {
    PostModel.findByIdAndUpdate(
      req.params.id,
      {
        $pull: { likers: req.body.id },
      },
      { new: true },
      (err, data) => {
        if (err) return res.status(400).send(err);
      }
    );
    UserModel.findByIdAndUpdate(
      req.body.id,
      {
        $pull: { likes: req.params.id },
      },
      { new: true },
      (err, data) => {
        if (!err) res.send(data);
        else return res.status(400).send(err);
      }
    );
  } catch (err) {
    return res.status(400).send(err);
  }
};
