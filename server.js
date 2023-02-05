const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const bcrypt = require('bcrypt');
const cors = require('cors');
const knex = require('knex');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');
require('dotenv').config();

const db = knex({
  client: 'pg',
  connection: {
    host: 'dpg-cffo8do2i3mg6p9doeqg-a',
    user: 'smart_brain_db1_g',
    database: 'smart_brain_db1',
    password: 'process.env.DB_PASSWORD',
    port: PORT,
    ssl: true,
  },
});

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('It is working!');
});

app.post('/signin', (req, res) => {
  signin.handleSignin(req, res, db, bcrypt);
});

app.post('/register', (req, res) => {
  register.handleRegister(req, res, db, bcrypt);
});

app.get('/profile/:id', (req, res) => {
  profile.handleProfileGet(req, res, db);
});

app.put('/image', (req, res) => {
  image.handleImage(req, res, db);
});

app.post('/imageurl', (req, res) => {
  image.handleApiCall(req, res);
});

app.listen(PORT, () => {
  console.log(`Running on ${PORT}`);
});
