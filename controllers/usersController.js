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

    // res.status(200).json({
    //   message: 'Registration successful',
    //   body: {
    //     email: createdUser.email,
    //     name: createdUser.name,
    //   }
    // });
    res.status(200).json({
      email: createdUser.email,
      name: createdUser.name,
      userId: createdUser._id
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
        email: foundUser.email,
        name: foundUser.name,
        userId: foundUser._id,
        quickStart: foundUser.quickStart
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
      res.status(204).json({message: 'success'});
    }
  })
});

// User Update
router.put('/:id', async (req, res) => {
  try {
    const updatedUser = await db.User.findByIdAndUpdate(
      req.params.id, req.body, {new: true});

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(400).json(error);
  }
})

// User Favorites Index
router.get('/favorites', async (req, res) => {
  try {
    if (!req.query.email) {
      const allFavorites = await db.Favorite.find({});
      res.json(200, allFavorites);
    } else {
      const foundUser = await db.User.findOne({email: req.query.email});
      const userFavorites = await db.Favorite.find({userId: foundUser._id});
      res.status(200).json(userFavorites);
    }

  } catch (error) {
    res.send(error);
  }
});

// User Add Favorite
router.post('/favorites', async (req, res) => {

  try {
    const foundUser = await db.User.findOne({email: req.body.email});
    const favoriteDbEntry = {
      origin: req.body.origin,
      userId: foundUser._id
    }
    if (req.body.destination) favoriteDbEntry.destination = req.body.destination;

    const createdFavorite = await db.Favorite.create(favoriteDbEntry);
    console.log(createdFavorite);

    res.status(200).json(createdFavorite);

  } catch (error) {
    res.status(400).json(error);
  }
});

// User Show Favorite
router.get('/favorites/:id', async (req, res) => {
  try {
    const foundFavorite = await db.Favorite.findById(req.params.id);

    res.status(200).json(foundFavorite);
  } catch (error) {
    res.status(400).json(error);
  }
})

// User Update Favorite
router.put('/favorites/:id', async (req, res) => {
  try {
    const updatedFavorite = await db.Favorite.findByIdAndUpdate(
      req.params.id, req.body, {new: true});

    res.status(200).json(updatedFavorite);
  } catch (error) {
    res.status(400).json(error);
  }
});

// User Delete Favorite
router.delete('/favorites/:id', async (req, res) => {
  try {
    // delete from user - quick look if applicable
    const deletedFavorite = await db.Favorite.findByIdAndDelete(req.params.id);
    const deletedQuickLook = await db.User.findByIdAndUpdate(deletedFavorite.userId, {
      quickStart: null
    })
    res.status(200).json(deletedFavorite);
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = router;