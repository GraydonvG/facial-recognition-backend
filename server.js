const express = require('express');
const app = express();
const port = 3000;
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');

const database = {
  users: [
    {
      id: '123',
      name: 'John',
      email: '1',
      password: '1',
      entries: 0,
      joined: new Date(),
    },
    {
      id: '124',
      name: 'Sally',
      email: 'sally@gmail.com',
      password: '2222',
      entries: 0,
      joined: new Date(),
    },
  ],
};

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send(database.users);
});

app.post('/signin', (req, res) => {
  if (req.body.email === database.users[0].email && req.body.password === database.users[0].password) {
    res.json(database.users[0]);
  } else {
    res.status(400).json('failed to sign in');
  }
});

app.post('/register', (req, res) => {
  const { name, email, password } = req.body;
  database.users.push({
    id: '125',
    name: name,
    email: email,
    entries: 0,
    joined: new Date(),
  });
  res.json(database.users[database.users.length - 1]);
});

app.get('/profile/:id', (req, res) => {
  const { id } = req.params;
  let match = false;
  database.users.forEach((user) => {
    if (user.id === id) {
      match = true;
      return res.json(user);
    }
  });
  if (!match) {
    res.status(400).json('user not found');
  }
});

app.put('/image', (req, res) => {
  const { id } = req.body;
  let match = false;
  database.users.forEach((user) => {
    if (user.id === id) {
      match = true;
      user.entries += 1;
      return res.json(user.entries);
    }
  });
  if (!match) {
    res.status(400).json('user not found');
  }
});

app.listen(port, () => {
  console.log(`running on ${port}`);
});
