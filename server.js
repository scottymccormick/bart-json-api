const express = require('express');
const app     = express();
const PORT    = process.env.PORT || 9000;

// Require DB and retrieve models
const db = require('./models');

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`)
})