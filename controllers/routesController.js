const express = require('express');
const router  = express.Router();
const axios   = require('axios');

router.get('/', (req, res) => {
  if (req.query.orig && req.query.dest) {
    const cmdType = req.query.cmd || 'depart';
    const date = req.query.date || 'now';
    const time = req.query.tie || 'now';
    axios.get(`http://api.bart.gov/api/sched.aspx?cmd=${cmdType}&orig=${req.query.orig}&dest=${req.query.dest}&date=${date}&time=${time}&a=4&b=0&json=y&key=${process.env.BART_API_KEY}`)
      .then((response) => {
        console.log(response.status);
        const scheduleInfo = response.data.root.schedule;
        res.json(scheduleInfo);
      })
      .catch((err) => {
        res.send(err);
      });
  } else {
    res.json(400, 'Need more parameters');
  }
})

module.exports = router;