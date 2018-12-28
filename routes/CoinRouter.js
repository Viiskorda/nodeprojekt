const express = require('express');
const app = express();
const CoinRouter = express.Router();
const Coin = require('../models/Coin.model');

CoinRouter.route('/').get(function (req, res) {
   Coin.find(function (err, coins){
      if(err){
        console.log(err);
      }
      else {
       
        res.render('index', {coins: coins});
      }
    });
});

CoinRouter.route('/create').get(function (req, res) {
   res.render('create');
 });

 CoinRouter.route('/post').post(function (req, res) {
   const coin = new Coin(req.body);
   console.log(coin);
   coin.save()
     .then(coin => {
     res.redirect('/coins');
     io.sockets.emit('message', req.body);
     })
     
     .catch(err => {
      //sendStatus('See kell on juba võetud');
     
     res.status(400).send("unable to save to database");
     });
 });

CoinRouter.route('/edit/:id').get(function (req, res) {
   const id = req.params.id;
   Coin.findById(id, function (err, coin){
       res.render('edit', {coin: coin});
   });
   
 });




 CoinRouter.route('/update/:id').post(function (req, res) {
   Coin.findById(req.params.id, function(err, coin) {
     if (!coin)
       return next(new Error('Could not load Document'));
     else {
       // do your updates here
       coin.name = req.body.name;
       coin.price = req.body.price;
 
       coin.save().then(coin => {
           res.redirect('/coins');
           io.sockets.emit('message', req.body);
       })
       .catch(err => {
        //sendStatus('See kell on juba võetud'); //see käib kaasas socket io-ga
             res.status(400).send("unable to update the database");
       });
     }
   });
 });

 CoinRouter.route('/delete/:id').get(function (req, res) {
   Coin.findByIdAndRemove({_id: req.params.id},
        function(err, coin){
         if(err) res.json(err);
         else res.redirect('/coins');
         io.sockets.emit('message',  req.params.id);
     });
 });



 CoinRouter.route('/messages').get( (req, res) => {
  Coin.find((err, messages)=> {
    res.send(messages);
  })
});

CoinRouter.route('/messages').post( (req, res) => {
  var message = new Coin(req.body);
  message.save((err) =>{
    if(err)
      sendStatus(500);
    res.sendStatus(200);
  })
});


module.exports = CoinRouter;