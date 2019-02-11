const express    = require('express');
const app        = express();
const bodyParser = require('body-parser');
const session    = require('express-session');
const bcrypt     = require('bcryptjs');
const cors       = require('cors');
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
app.use(cors({
  origin: 'http://localhost',
  credentials: true,
  optionsSuccessStatus: 200
}));

app.get('/', (req, res) => {
  res.send('<h1>Reached BART API</h1>');
});

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`)
});