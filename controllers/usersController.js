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

    res.send('Success')

  } catch (err) {
    console.log(err);
    return err;
  }
});

// User Show
router.post('/login', async (req, res) => {
  try {
    const foundUser = await db.User.findOne({email: req.body.email});

    if (foundUser) {
      if (bcrypt.compareSync(req.body.password, foundUser.password)) {
        console.log('Matched passwords!')
        req.session.email = foundUser.email;
        req.session.logged = true;
        console.log('session logged', req.session.logged);
      } else {
        console.log('not matched!');
        console.log('session logged', req.session.logged);
      }
    }
    res.json(foundUser);
  } catch (err) {
    console.log(err);
    return err;
  }
})

module.exports = router;