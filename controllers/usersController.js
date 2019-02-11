const express = require('express');
const router  = express.Router();

const db = require('../models');

// User Index
router.get('/', (req, res) => {
  res.send('Reached user index route');
});

module.exports = router;