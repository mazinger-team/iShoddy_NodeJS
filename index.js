'use strict';

// We injected mongoose
//let mongoose = require('mongoose');

//Property file is loaded
let DEBUG_TRACE_LEVEL = require('./config/local_config').DEBUG_TRACE_LEVEL;

// Cargamos el fichero app.js con toda la configuración y la carga central
let app = require('./app');
require('./bin/www');

if (DEBUG_TRACE_LEVEL >= 2) {
    console.log('1.index');
}

// Creamos el puerto del servidor web de nodeJS
/*
 let port = process.env.PORT || 3999;
 mongoose.Promise = global.Promise;
 */

if (DEBUG_TRACE_LEVEL >= 2) {
    console.log('2.index');
}

// Creamos la conexión con la base de datos
//mongoose.connect('mongodb://127.0.0.1:27017/inLunchNode', (err, res) => {
/*mongoose.connect('mongodb:inLunchNodeUser:InLunchNodeUserPass@127.0.0.1:27017/inLunchNode', (err, res) => {
 if(err){
 throw err;
 }else{
 console.log('La conexión a la BBDD funciona ......');
 //Ponemos a escuchar el puerto que hemos creado
 app.listen(port, function() {
 console.log('Servidor del API REST en http://localhost:'+ port);
 });
 }
 });
 */

if (DEBUG_TRACE_LEVEL >= 2) {
    console.log('3.index');
}