const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
var favicon = require('serve-favicon')
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
var server = app.listen(port, function () {
  console.log('Node js Express js Tutorial at port', port);
});
global.io = require('socket.io').listen(server);

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/reservations');

const HairDresserRouter = require('./routes/HairDresserRouter');

app.use(express.static('public'));
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/bookingtime', HairDresserRouter);

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


