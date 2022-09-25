const mongoose = require('mongoose');

mongoose
  .connect(
    'mongodb+srv://' +
      process.env.DB_USER_PASS +
      '@cluster0.bgpq40p.mongodb.net/projet-groupomania'
  )
  .then(() => console.log('Connexion à MongoDB'))
  .catch((err) => console.log('Echec de la connexion à mongoDB', err));
