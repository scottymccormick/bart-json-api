const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const favoriteSchema = new Schema({
  origin: {
    type: String,
    required: true
  },
  destination: String,
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
});

const Favorite = mongoose.model('Favorite', favoriteSchema);

module.exports = Favorite;