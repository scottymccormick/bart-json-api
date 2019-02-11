const express = require('express');
const router  = express.Router();
const bcrypt  = require('bcryptjs');

const db = require('../models');

// User Index
router.get('/', (req, res) => {
  res.send('Reached user index route');
});

// User Registration
router.post('/register', async (req, res) => {
  try {
    const password = req.body.password;
    const hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

    const userDbEntry = {
      email: req.body.email,
      password: hashedPassword
    }

    createdUser = await db.User.create(userDbEntry);
    console.log(createdUser);
    
    req.session.email = createdUser.email;
    req.session.logged = true;

    res.json({
      status: 200,
      message: 'Registration successful'
    });
  } catch (err) {
    console.log(err);
    return err;
  }
});

// User Login
router.post('/login', async (req, res) => {
  try {
    const foundUser = await db.User.findOne({email: req.body.email});

    if (foundUser && bcrypt.compareSync(req.body.password, foundUser.password)) {
      console.log('Matched passwords!');
      req.session.email = foundUser.email;
      req.session.logged = true;
      console.log('session logged', req.session.logged);
      res.json({
        status: 200,
        message: 'Login successful'
      });
    } else {
      console.log('not matched!');
      console.log('session logged', req.session.logged);
      res.json({
        status: 401,
        message: 'Email or password are incorrect'
      });
    }
  } catch (err) {
    console.log(err);
    return err;
  }
});

// User Logout
router.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      res.send(err);
    } else {
      res.json({
        status: 200,
        message: 'Logout successful'
      });
    }
  })
})

module.exports = router;