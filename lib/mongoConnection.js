"use strict";

var mongoose = require('mongoose');

mongoose.Promise = global.Promise;    // Indicamos librería de promesas a usar

var promise = mongoose.connect('mongodb://localhost:27017/ishoddy', {
    useMongoClient: true
    /* other options */
});

promise.then(function() {
    console.log('Conectado a mongodb.');
});




/* Last version < 4.11.0:

 var db = mongoose.connection;

 mongoose.Promise = global.Promise;    // Indicamos librería de promesas a usar

 db.on('error', console.log.bind(console));

 db.once('open', function() {
 console.log('Conectado a mongodb.');
 });

 mongoose.connect('mongodb://localhost:27017/ishoddy');

 */