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
      name: req.body.name,
      password: hashedPassword
    }

    createdUser = await db.User.create(userDbEntry);
    console.log(createdUser);
    
    req.session.email = createdUser.email;
    req.session.logged = true;

    res.json({
      status: 200,
      message: 'Registration successful',
      body: {
        email: createdUser.email,
        name: createdUser.name,
      }
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
      res.status(200).json({
        message: 'Login successful',
        body: foundUser.email
      });
    } else {
      console.log('not matched!');
      console.log('session logged', req.session.logged);
      res.status(401).json({
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
});

// User Add Favorite
router.post('/favorites', (req, res) => {
  db.Favorite.create(req.body, (err, createdFavorite) => {
    if (err) {
      res.send(err)
    } else {
      console.log(createdFavorite);
      res.json(createdFavorite);
    }
  })
});

module.exports = router;