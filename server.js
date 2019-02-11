const express    = require('express');
const app        = express();
const bodyParser = require('body-parser');
const PORT       = process.env.PORT || 9000;

// Require DB and retrieve models
const db = require('./models');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`)
})