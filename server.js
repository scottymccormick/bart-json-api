const express    = require('express');
const app        = express();
const dotenv     = require('dotenv');
const bodyParser = require('body-parser');
const session    = require('express-session');
const cors       = require('cors');
const PORT       = process.env.PORT || 9000;

// Config .env variables
dotenv.config();

// Require DB and retrieve models
const db = require('./models');

const usersController = require('./controllers/usersController');
const stationsController = require('./controllers/stationsController');
const routesController = require('./controllers/routesController');

app.use(session({
  secret: "the doors are closing, please stand clear of the doors",
  resave: false,
  saveUninitialized: false
}))

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors({
  origin: ['http://localhost', 'https://barttrack.herokuapp.com'],
  credentials: true,
  optionsSuccessStatus: 200
}));

app.get('/', (req, res) => {
  res.send('<h1>Reached BART API</h1>');
});

app.use('/api/users', usersController);
app.use('/api/stations', stationsController);
app.use('/api/routes', routesController);

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`)
});