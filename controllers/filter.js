'use strict';

//Se carga el fichero de properties
let DEBUG_TRACE_LEVEL = require('./../config/local_config').DEBUG_TRACE_LEVEL;

//Static Methods
//Method that retrieves the received model using the received filter
let list = function (model, filter, sort, limit, skip, fields, result) {
    if (DEBUG_TRACE_LEVEL >= 1) {
        console.log('**** FUNCTION list ****');
    }
    //The search is carried out taking into account:
    //That they comply with the condition received
    let query = model.find(filter);
    //They will be sorted by the field indicated in the sort parameter
    query.sort(sort);
    //You will see as many documents as indicated in the limit parameter
    query.limit(limit);
    //You will skip as many documents as indicated in the skip
    query.skip(skip);
    //Fields will be displayed as indicated in the fields parameter. To display multiple fields, you must separate them with spaces
    query.select(fields);

    if (DEBUG_TRACE_LEVEL >= 2) {
        console.log('** Parameters before the consultation **');
        console.log('filter: ', filter);
        console.log('sort: ', sort);
        console.log('limit: ', limit);
        console.log('skip: ', skip);
        console.log('fields: ', fields);
    }

    //The query is executed
    return query.exec(result);
};

module.exports = list;