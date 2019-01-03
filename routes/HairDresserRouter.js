const express = require('express');
const app = express();
const HairDresserRouter = express.Router();
const HairDresserReservation = require('../models/HairDresserReservation.model');

HairDresserRouter.route('/').get(function (req, res) {
   HairDresserReservation.find(function (err, bookingtime){
      if(err){
        console.log(err);
      }
      else {
       
        res.render('index', {bookingtime: bookingtime});
      }
    });
});

HairDresserRouter.route('/create').get(function (req, res) {
   res.render('create');
 });

 HairDresserRouter.route('/post').post(function (req, res) {
   const time = new HairDresserReservation(req.body);
   console.log(time);
   time.save()
     .then(time => {
      res.redirect('back');
     io.sockets.emit('message', time);
     
      // saadame kõikidele klientidele tagasi
      io.emit('teade', 'Andmed salvestati: ' +time.time+' '+time.name);

  
     })
     
     .catch(err => {
      //sendStatus('See kell on juba võetud');
     
     res.status(400).send("Veateade! See aeg on juba võetud. Vali teine aeg");
     });
 });




HairDresserRouter.route('/edit/:id').get(function (req, res) {
   const id = req.params.id;
   HairDresserReservation.findById(id, function (err, time){
       res.render('edit', {time: time});
   });
   
 });




 HairDresserRouter.route('/update/:id').post(function (req, res) {
   HairDresserReservation.findById(req.params.id, function(err, time) {
     if (!time)
       return next(new Error('Could not load Document'));
     else {
       // do your updates here
       time.name = req.body.name;
       time.time = req.body.time;
 
       time.save().then(time => {
           res.redirect('/bookingtime');
           io.sockets.emit('change', {params: req.params, body: req.body});
           io.emit('teade', 'Andmebaasis tehti muudatus');
       })
       .catch(err => {
        //sendStatus('See kell on juba võetud'); //see käib kaasas socket io-ga
             res.status(400).send("Veateade! See aeg on juba võetud!");
       });
     }
   });
 });

 HairDresserRouter.route('/delete/:id').get(function (req, res) {
   HairDresserReservation.findByIdAndRemove({_id: req.params.id},
        function(err, time){
         if(err) res.json(err);
         else res.redirect('/bookingtime');
         io.sockets.emit('remove',  req.params.id);
         io.emit('kustutati', 'Broneering tühistati');
     });
 });



 HairDresserRouter.route('/messages').get( (req, res) => {
  HairDresserReservation.find((err, messages)=> {
    res.send(messages);
  })
});

HairDresserRouter.route('/messages').post( (req, res) => {
  var message = new HairDresserReservation(req.body);
  message.save((err) =>{
    if(err)
      sendStatus(500);
    res.sendStatus(200);
  })
});


module.exports = HairDresserRouter;