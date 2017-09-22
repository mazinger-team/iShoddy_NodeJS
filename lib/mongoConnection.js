"use strict";

let mongoose = require('mongoose');

mongoose.Promise = global.Promise;    // Indicamos librería de promesas a usar

let database = require('../config/local_config').database;

let promise = mongoose.connect(database, {
    useMongoClient: true
    /* other options */
});

promise.on('error', console.log.bind(console));

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