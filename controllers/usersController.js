const express = require('express');
const router  = express.Router();

const db = require('../models');

// User Index
router.get('/', (req, res) => {
  res.send('Reached user index route');
});

// User Create
router.post('/', async (req, res) => {
  try {
    createdUser = await db.User.create(req.body);
    console.log(createdUser);
    res.send('Success')

  } catch (err) {
    console.log(err);
    return err;
  }
})

module.exports = router;