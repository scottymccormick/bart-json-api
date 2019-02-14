const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  name: String,
  quickStart: {
    type: Schema.Types.ObjectId,
    ref: 'Favorite'
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;