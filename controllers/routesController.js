const express = require('express');
const router  = express.Router();

router.get('/', (req, res) => {
  res.send('Reached routes controller root')
})

module.exports = router;