const express = require('express');
const router  = express.Router();
const axios   = require('axios');

router.get('/', (req, res) => {
  if (req.query.orig && req.query.dest) {
    axios.get(`http://api.bart.gov/api/sched.aspx?cmd=depart&orig=${req.query.orig}&dest=${req.query.dest}&json=y&key=${process.env.BART_API_KEY}`)
      .then((response) => {
        console.log(response.status);
        const scheduleInfo = response.data.root.schedule;
        res.json(scheduleInfo);
      })
      .catch((err) => {
        res.send(err);
      });
  } else {
    res.send('not enough query parameters');
  }
})

module.exports = router;