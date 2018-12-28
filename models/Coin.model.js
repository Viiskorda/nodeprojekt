// Coin.model.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongooseSocketIo = require('mongoose-socket.io');

const Coin = new Schema({
  name: {
    type: String
  },
  price: {
    type: String, unique: true
  }
},{
    collection: 'coins'
});

module.exports = mongoose.model('Coin', Coin);