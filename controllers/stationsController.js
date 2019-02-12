const express = require('express');
const router  = express.Router();

router.get('/', (req, res) => {
  res.send('Reached stations root route');
})

module.exports = router;