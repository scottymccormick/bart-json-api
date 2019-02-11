const express    = require('express');
const app        = express();
const bodyParser = require('body-parser');
const session    = require('express-session');
const PORT       = process.env.PORT || 9000;

// Require DB and retrieve models
const db = require('./models');

app.use(session({
  secret: "the doors are closing, please stand clear of the doors",
  resave: false,
  saveUninitialized: false
}))

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`)
})