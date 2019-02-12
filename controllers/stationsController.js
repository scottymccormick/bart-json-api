const express = require('express');
const router  = express.Router();
const axios   = require('axios');

// Stations index
router.get('/', (req, res) => {
  axios.get(`http://api.bart.gov/api/stn.aspx?cmd=stns&json=y&key=${process.env.BART_API_KEY}`)
    .then((response) => {
      console.log(response.status);
      const stationData = response.data.root.stations.station;
      console.log(stationData[0])
      const stationList = stationData.map(({name, abbr}) => ({name, abbr}));
      res.json(stationList);
    })
    .catch((err) => {
      res.send(err);
    })
})

module.exports = router;