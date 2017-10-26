"use strict";

// Requires
// The properties file is loaded
let database = require('./../config/local_config').database;
let DEBUG_TRACE_LEVEL = require('./../config/local_config').DEBUG_TRACE_LEVEL;

if (DEBUG_TRACE_LEVEL >= 2) {
    console.log('1.mongoConnection');
}


//Modules
let mongoose = require('mongoose');
let db = mongoose.connection;

if (DEBUG_TRACE_LEVEL >= 2) {
    console.log('2.mongoConnection');
}


// Indicate the promises library to be used
mongoose.Promise = global.Promise;

if (DEBUG_TRACE_LEVEL >= 2) {
    console.log('3.mongoConnection');
}


// This will be executed every time there is an error. You are listening to the event 'Error'
db.on('error', console.log.bind(console));

if (DEBUG_TRACE_LEVEL >= 2) {
    console.log('4.mongoConnection');
}


// This will run when you connect to MongoDB (with eleven it indicates that you only have to run once - singleton)
db.once('open', function () {
    console.log('Conectado a mongodb.');
});

if (DEBUG_TRACE_LEVEL >= 2) {
    console.log('5.mongoConnection');
}


// The connection is established
mongoose.connect(database, { useMongoClient: true }, function (ignore, connection) {
    connection.onOpen()
}).then(() => {
    console.log('connected')
}).catch(function(err) {
    console.log(err);
    process.exit();
});



if (DEBUG_TRACE_LEVEL >= 2) {
    console.log('6.mongoConnection');
}