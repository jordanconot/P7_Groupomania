const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');

// Modele du user
const userSchema = new mongoose.Schema(
  {
    pseudo: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 55,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      validate: [isEmail],
      lowercase: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      max: 1024,
      minlength: 8,
    },
    picture: {
      type: String,
      default: './uploads/profil/random-user.png',
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
    bio: {
      type: String,
      max: 1024,
    },
    likes: {
      type: [String],
    },
  },
  {
    timestamps: true,
  }
);

//Avant d'enregistrer le user dans la DB on crypte son mdp
userSchema.pre('save', async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

//Comparaison des mdp pour la connexion
userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error(`L'e-email ou le mot de passe ne correspondent pas !`);
  }
  throw Error(`L'e-email ou le mot de passe ne correspondent pas !`);
};

const UserModel = mongoose.model('user', userSchema);

module.exports = UserModel;
