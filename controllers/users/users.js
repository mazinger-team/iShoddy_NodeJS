'use strict';

let DEBUG_TRACE_LEVEL = require('./../../config/local_config').DEBUG_TRACE_LEVEL;
let parameters = require('./../../config/parameters');

let errorHandler = require('./../error'); //Manejador de errores
let responseHandler = require('./../responses'); //Manejador de respuestas
let list = require('./../filter'); //Query handler


let User = require('./../../models/User');


// Insert professional service
function saveUser(req, res) {
   // if (DEBUG_TRACE_LEVEL >= 1) {
        console.log('**** FUNCTION saveUser ****');
   // }

    let user = new User(req.body);

    User.findOne({ 'email' : user.email } ).exec(function (err, userRegistered) {
        console.log('**** FUNCTION saveUser ****');
        if (err) {
            console.log('**** error ****');
            return errorHandler(new Error('Duplicate Entry'), "Lamentamos comunicarle que no se ha podido procesar su petición. Inténtelo de nuevo más tarde.", res, 500);
        
        }else if( userRegistered ){
            console.log('**** USUARIO DUPLICADO ****');
            return errorHandler(new Error('Duplicate Entry'), "Usuario ya registrado, introduzca otro correo electrónico.", res, 409);
        }else{
            console.log('prueba');
            user.save(function (err, result) {
                if (err) {
                    return next(err);
                }
                return res.json({success: true, result: result});
            })
        }

    })

   // if (DEBUG_TRACE_LEVEL >= 2) {
        console.log('Se va a dar de alta el usuario');
        console.log('req.body: ', req.body);
    //}


   

    
   
}


module.exports = {
    saveUser
};