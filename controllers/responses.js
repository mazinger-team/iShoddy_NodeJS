/**
 * Created by JoseJacin on 4/4/17.
 */
'use strict';

//Se carga el fichero de properties
let DEBUG_TRACE_LEVEL = require('./../config/local_config').DEBUG_TRACE_LEVEL;
let parameters = require('./../config/parameters');

//Responses handling function
function responseHandler(msg, res, sta, element, typeElement, page) {
    if (DEBUG_TRACE_LEVEL >= 1) {
        console.log('**** FUNCTION responses.responsesHandler.Start of function ****');
    }

    if (DEBUG_TRACE_LEVEL >= 2) {
        console.log(msg);
    }

    let filter = {
        headerData: {
            paginationData: {
                paginationFlag: element.length === parameters.query.num_elements,
                paginationKey: page,
                paginationElements: element.length
            }
        }
    };

    switch(typeElement) {
        case "listProfessionalsOutputType":
            filter["listProfessionalsOutputType"] = {
                professionals: [ element ]
            };
            break;
        case "listCategoriesOutputType":
            filter["listCategoriesOutputType"] = {
                categories: [ element ]
            };
            break;
        default:
            break;
    }

    res.status(sta).json(filter);
}

module.exports = responseHandler;