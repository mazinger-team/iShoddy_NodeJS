'use strict';

//Se carga el fichero de properties
let DEBUG_TRACE_LEVEL = require('./../config/local_config').DEBUG_TRACE_LEVEL;

//Función manejadora de los errores que muestra el error en el idioma indicado
function errorHandler(err, message, res, sta) {
    if (DEBUG_TRACE_LEVEL >= 1) {
        console.log('**** FUNCTION error.errorHandler.Start function ****');
    }

    res.status(sta).json({headerData : {
        errorData: {
            errorCode: sta,
            errorTitle: err.message,
            errorText: message
        }
    }
    });

    if (DEBUG_TRACE_LEVEL >= 1) {
        console.log('**** FUNCTION error.errorHandler.End function ****');
    }
}

module.exports = errorHandler;