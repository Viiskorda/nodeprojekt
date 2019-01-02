// HairDresserReservation.model.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//const mongooseSocketIo = require('mongoose-socket.io');

const HairDresserReservation = new Schema({
  name: {
    type: String
  },
  time: {
    type: String, unique: true
  }
},{
    collection: 'bookingtime'
});

module.exports = mongoose.model('HairDresserReservation', HairDresserReservation);