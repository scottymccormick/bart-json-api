const mongoose = require('mongoose');
const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/bart-api';

mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
});

mongoose.connection.on('connected', () => {
  console.log(`Mongoose connected on ${connectionString}`)
});
mongoose.connection.on('error', (err) => {
  console.log(`Mongoose error: ${err}`);
});
mongoose.connection.on('disconnected', () => {
  console.log(`Mongoose disconnected from ${connectionString}`)
});

module.exports = {
  User: require('./User'),
  Favorite: require('./Favorite'),
}