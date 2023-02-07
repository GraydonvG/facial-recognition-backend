const handleRegister = (req, res, db, bcrypt) => {
  const { name, email, password } = req.body;
  if (!email || !name || !password) {
    return res.status(400).json('Incorrect form submission');
  }
  // const hash = bcrypt.hashSync(password, 10);
  const hash = async function (password) {
    try {
      const salt = await bcrypt.genSaltAsync(10);
      return await bcrypt.hashAsync(password, salt);
    } catch (err) {
      console.log('Oops', err);
    }
  };

  db.transaction((trx) => {
    trx
      .insert({
        hash: hash,
        email: email,
      })
      .into('login')
      .returning('email')
      .then((loginEmail) => {
        return trx('users')
          .returning('*')
          .insert({
            name: name,
            email: loginEmail[0].email,
            joined: new Date(),
          })
          .then((user) => {
            res.json(user[0]);
          });
      })
      .then(trx.commit)
      .catch(trx.rollback);
  }).catch((err) => {
    res.status(400).json('Unable to register');
  });
};

module.exports = {
  handleRegister,
};
