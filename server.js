const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const userRoutes = require('./routes/user.routes');
const postRoutes = require('./routes/post.routes');
require('dotenv').config({ path: './config/.env' });
require('./config/db');
const { checkUser, requireAuth } = require('./middleware/auth.middleware');
const cors = require('cors');

const app = express();
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Accept, Content-Type'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, PATCH, OPTIONS'
  );
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

//jwt
app.get('*', checkUser);
app.get('/jwtid', requireAuth, (req, res) => {
  res.status(200).send(res.locals.user._id);
});

//routes
app.use('/api/user', userRoutes);
app.use('/api/post', postRoutes);

//serveur
app.listen(process.env.PORT, () => {
  console.log(`En ecoute sur le port ${process.env.PORT}`);
});
