const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const knex = require('../db/client');
const session = require('express-session');

router.get('/login', (req, res) => {
  res.render('sessions/login');
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  formattedName = username.toLowerCase().split(' ').map(name => name.charAt(0).toUpperCase() + name.slice(1)).join(' ');

  const user = await knex('users').where('username', formattedName).first();
  // console.log('user: ', user)
  if (!user) {
    return res.status(500).render('sessions/login', { error: 'Invalid username or password' });
  }

  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    return res.status(500).render('sessions/login', { error: 'Invalid username or password' });
  }

  req.session.user = user;
  // req.session.username = user;
  res.status(200).redirect('/tasks');
});

router.get('/logout', (req, res) => {
  req.session.destroy();
  res.render('sessions/logout');
});

module.exports = router;
