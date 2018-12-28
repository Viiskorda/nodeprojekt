const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
var server =app.listen(port, function(){
  console.log('Node js Express js Tutorial at port', port);
});
global.io = require('socket.io').listen(server);

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/expressdemo');

const CoinRouter = require('./routes/CoinRouter');

app.use(express.static('public'));
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/coins', CoinRouter);

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname,'public', 'index.html'));
});



//const io = require('socket.io')();
// io.on('connection', function (socket) {
//   console.log('Ühendus kasutajaga on loodud');
//   io.emit('this', { will: 'be received by everyone'});

//   socket.on('private message', function (from, msg) {
//     console.log('I received a private message by ', from, ' saying ', msg);
//   });

//   socket.on('disconnect', function () {
//     io.emit('user disconnected');
//   });
// });

io.on('connection', function(socket){
  console.log('Ühendus kasutajaga on loodud');
  
  // võtame kliendi poolt vastu teate "chat"
  socket.on('chat', (msg) => {
      // saadame kõikidele klientidele tagasi
      io.emit('chat', msg);
  });

  
});
