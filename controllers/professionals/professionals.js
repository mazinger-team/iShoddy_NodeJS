'use strict';

let DEBUG_TRACE_LEVEL = require('./../../config/local_config').DEBUG_TRACE_LEVEL;
let parameters = require('./../../config/parameters');

let errorHandler = require('./../error'); //Manejador de errores
let responseHandler = require('./../responses'); //Manejador de respuestas
let list = require('./../filter'); //Query handler

let Professional = require('./../../models/Professional');


// Function that checks if id field has been reported
function getProfessionals(req, res) {
    if (DEBUG_TRACE_LEVEL >= 1) {
        console.log('**** FUNCTION professionals.getProfessionals ****');
    }

    if (DEBUG_TRACE_LEVEL >= 2) {
        console.log('req.query.id', req.query.id);
    }

    if (typeof req.query.id !== 'undefined') {
        if (DEBUG_TRACE_LEVEL >= 1) {
            console.log("1.getProfessionals.professionalId is defined: ", req.query.id)
        }
        getProfessionalById(req, res);
    } else {
        if (DEBUG_TRACE_LEVEL >= 1) {
            console.log("2.getProfessionals.professionalId is undefined: ", req.query.id)
        }
        getProfessionalsByQuery(req, res);
    }
}

// Insert professional service
function saveProfessional(req, res) {
    if (DEBUG_TRACE_LEVEL >= 1) {
        console.log('**** FUNCTION professional.saveProfessional ****');
    }

    let professional = new Professional(req.body);

    if (DEBUG_TRACE_LEVEL >= 2) {
        console.log('Parameters before entering function');
        console.log('req.body', req.body);
    }

    professional.save((err, professionalSave) => {
        if (DEBUG_TRACE_LEVEL >= 1) {
            console.log('1.saveProfessional.save');
        }

        if (err) {
            if (DEBUG_TRACE_LEVEL >= 1) {
                console.log('2.Request failed');
            }
            return errorHandler(new Error('Request failed'), "An error occurred in the query", res, 500);
        } else {
            if (!professionalSave) {
                if (DEBUG_TRACE_LEVEL >= 1) {
                    console.log('3.Unsaved Professional');
                }
                return errorHandler(new Error('Unsaved Professional'), "The professional could not save", res, 404);
            } else {
                if (DEBUG_TRACE_LEVEL >= 1) {
                    console.log("4.Professional created correctly. professionalSave: ", professionalSave)
                }
                return responseHandler('Professional created correctly', res, 200, professionalSave, parameters.models.professionals);
            }
        }
    });
}

// Update professional service
function editProfessional(req, res) {
    if (DEBUG_TRACE_LEVEL >= 1) {
        console.log('**** FUNCTION professional.editProfessional ****');
    }

    let professionalId = req.query.id;
    let updateParams = req.body;

    if (DEBUG_TRACE_LEVEL >= 2) {
        console.log('Parameters before entering function');
        console.log('professionalId', professionalId);
    }


    Professional.findByIdAndUpdate(professionalId, updateParams, (err, professionalUpdated) => {
        if (DEBUG_TRACE_LEVEL >= 1) {
            console.log('1.saveProfessional.findByIdAndUpdate');
        }
        if (err) {
            if (DEBUG_TRACE_LEVEL >= 1) {
                console.log('2.Request failed');
            }
            return errorHandler(new Error('Request failed'), "An error occurred in the query", res, 500);
        } else {
            if (!professionalUpdated) {
                if (DEBUG_TRACE_LEVEL >= 1) {
                    console.log('3.Professional not found to update');
                }
                return errorHandler(new Error('The professional to modify does not exist'), "The professional to modify does not exist", res, 404);
            } else {
                if (DEBUG_TRACE_LEVEL >= 1) {
                    console.log('4.Professionally updated correctly. professionalUpdated: ', professionalUpdated);
                }
                return responseHandler('Professionally updated correctly', res, 200, professionalUpdated, parameters.models.professionals);
            }
        }
    });
}

// Delete professional service
function deleteProfessional(req, res) {
    if (DEBUG_TRACE_LEVEL >= 1) {
        console.log('**** FUNCTION professional.deleteProfessional ****');
    }

    let professionalId = req.query.id;

    if (DEBUG_TRACE_LEVEL >= 2) {
        console.log('Parameters before entering function');
        console.log('professionalId', professionalId);
    }

    Professional.findByIdAndRemove(professionalId, (err, professionalRemoved) => {
        if (DEBUG_TRACE_LEVEL >= 1) {
            console.log('1.deleteProfessional.findByIdAndRemove');
        }
        if (err) {
            if (DEBUG_TRACE_LEVEL >= 1) {
                console.log('2.Request failed');
            }
            return errorHandler(new Error('Request failed'), "An error occurred in the query", res, 500);
        } else {
            if (!professionalRemoved) {
                if (DEBUG_TRACE_LEVEL >= 1) {
                    console.log('3.Professional not found to to delete');
                }
                return errorHandler(new Error('The professional to delete does not exist'), "The professional to delete does not exist", res, 404);
            } else {
                if (DEBUG_TRACE_LEVEL >= 1) {
                    console.log('4.Professional deleted correctly. professionalRemoved: ', professionalRemoved);
                }
                return responseHandler('Professional deleted correctly', res, 200, professionalRemoved, parameters.models.professionals);
            }
        }
    });
}

//Estatic Methods
//Method that the professional retrieves with the received id
function getProfessionalById(req, res) {
    if (DEBUG_TRACE_LEVEL >= 1) {
        console.log('**** FUNCTION professional.getProfessionalById ****');
    }

    if (DEBUG_TRACE_LEVEL >= 2) {
        console.log('Parameters before entering function');
        console.log('req.query.id', req.query.id);
    }

    //It retrieves the input parameters that arrive in the GET (URL)
    //Filter Parameters
    let professionalId = req.query.id;

    if (DEBUG_TRACE_LEVEL >= 2) {
        console.log('Assigned Parameters');
        console.log('professionalId', professionalId);
    }

    if (DEBUG_TRACE_LEVEL >= 1) {
        console.log('Validation of the fields to be used in the filter');
    }

    if (typeof professionalId !== 'undefined') {
        if (DEBUG_TRACE_LEVEL >= 1) {
            console.log('professionalId is informed, so it will be used in the filter. professionalId: ', professionalId);
        }

        Professional
            .findById(professionalId)
            .populate('category','name')
            .populate('subcategory','name')
            .populate('demands._id','title')
            .exec((err, professional) => {
            if (DEBUG_TRACE_LEVEL >= 1) {
                console.log('1.getProfessionalById.findById');
            }

            if (err) {
                console.log(err);

                if (DEBUG_TRACE_LEVEL >= 1) {
                    console.log('2.Request failed');
                }

                return errorHandler(new Error('Request failed'), "An error occurred in the query", res, 500);
            } else {
                if (!professional) {
                    if (DEBUG_TRACE_LEVEL >= 1) {
                        console.log('3.The professional does not exist');
                    }

                    return errorHandler(new Error('The professional does not exist'), "The professional does not exist", res, 404);

                } else {
                    if (DEBUG_TRACE_LEVEL >= 1) {
                        console.log('4.The professional has recovered. professional: ', professional);
                    }
                    //Se responde con un JSON con la información recuperada de la BBDD
                    return responseHandler('The professional has recovered', res, 200, professional, parameters.models.professionalDetail);
                }
            }
        });
    }
}

// List professionals
function getProfessionalsByQuery(req, res) {
    if (DEBUG_TRACE_LEVEL >= 1) {
        console.log('**** FUNCTION professionals.getProfessionalsByQuery ****');
    }

    // Professional filter
    let user_id = req.query.user_id,
        user_name = req.query.user_name,
        category = req.query.category,
        subcategory = req.query.subcategory,
        corp_name = req.query.corp_name,
        description = req.query.description,
        fiscal_id = req.query.fiscal_id,
        street = req.query.street,
        postal_code = req.query.postal_code,
        area = req.query.area,
        city = req.query.city,
        province = req.query.province,
        gps_lat = req.query.gps_lat,
        gps_lon = req.query.gps_lon,
        web_url = req.query.web_url,
        email = req.query.email,
        telephone = req.query.telephone,
        opening_hours = req.query.opening_hours,
        register_date = req.query.register_date,
        rate_visit = req.query.rate_visit,
        rate_hour = req.query.rate_hour,
        rate_notes = req.query.rate_notes,
        rating_accumulated = req.query.rating_accumulated,
        rating_votes = req.query.rating_votes,
        rating = req.query.rating;

    // Geo params

    console.log('parameters.query.min_distance', parameters.query.min_distance);

    let min = req.query.min || parameters.query.min_distance,
        max = req.query.max || parameters.query.max_distance;

    // Query params
    let sort = req.query.sort || null,
        page = parseInt(req.query.page || 0),
        size = parameters.query.num_elements,
        skip = page > 0 ? ((page - 1) * size) : 0,
        limit = req.query.limit || parameters.query.num_elements,
        fields = req.query.fields || null;

    if (DEBUG_TRACE_LEVEL >= 2) {
        console.log('req.query.user_id',req.query.user_id);
        console.log('req.query.user_name',req.query.user_name);
        console.log('req.query.category',req.query.category);
        console.log('req.query.subcategory',req.query.subcategory);
        console.log('req.query.corp_name',req.query.corp_name);
        console.log('req.query.description',req.query.description);
        console.log('req.query.fiscal_id',req.query.fiscal_id);
        console.log('req.query.street',req.query.street);
        console.log('req.query.postal_code',req.query.postal_code);
        console.log('req.query.area',req.query.area);
        console.log('req.query.city',req.query.city);
        console.log('req.query.province',req.query.province);
        console.log('req.query.gps_lat',req.query.gps_lat);
        console.log('req.query.gps_lon',req.query.gps_lon);
        console.log('req.query.web_url',req.query.web_url);
        console.log('req.query.email',req.query.email);
        console.log('req.query.telephone',req.query.telephone);
        console.log('req.query.opening_hours',req.query.opening_hours);
        console.log('req.query.register_date',req.query.register_date);
        console.log('req.query.rate_visit',req.query.rate_visit);
        console.log('req.query.rate_hour',req.query.rate_hour);
        console.log('req.query.rate_notes',req.query.rate_notes);
        console.log('req.query.rating_accumulated',req.query.rating_accumulated);
        console.log('req.query.rating_votes',req.query.rating_votes);
        console.log('req.query.rating',req.query.rating);
        console.log('req.query.min',req.query.min);
        console.log('req.query.max',req.query.max);
        console.log('req.query.sort',req.query.sort);
        console.log('req.query.page',req.query.page);
        console.log('req.query.limit',req.query.limit);
        console.log('req.query.fields',req.query.fields);
    }

    let counterCoor = 0,
        indQuery = 0,
        query = {};

    // Params control
    if (typeof user_id !== 'undefined') {
        query.user_id = user_id;
        indQuery = 1;
    }

    if (typeof user_name !== 'undefined') {
        query.user_name = user_name;
        indQuery = 1;
    }

    if (typeof category !== 'undefined') {
        query.category = category;
        indQuery = 1;
    }

    if (typeof subcategory !== 'undefined') {
        query.subcategory = subcategory;
        indQuery = 1;
    }

    if (typeof corp_name !== 'undefined') {
        query.corp_name = corp_name;
        indQuery = 1;
    }

    if (typeof description !== 'undefined') {
        query.description = description;
        indQuery = 1;
    }

    if (typeof fiscal_id !== 'undefined') {
        query.fiscal_id = fiscal_id;
        indQuery = 1;
    }

    if (typeof street !== 'undefined') {
        query.street = street;
        indQuery = 1;
    }

    if (typeof postal_code !== 'undefined') {
        query.postal_code = postal_code;
        indQuery = 1;
    }

    if (typeof area !== 'undefined') {
        query.area = area;
        indQuery = 1;
    }

    if (typeof city !== 'undefined') {
        query.city = city;
        indQuery = 1;
    }

    if (typeof province !== 'undefined') {
        query.province = province;
        indQuery = 1;
    }

    if (typeof gps_lon !== 'undefined') {
        counterCoor+=1;
    }

    if (typeof gps_lat !== 'undefined') {
        counterCoor+=1;
    }

    if (typeof web_url !== 'undefined') {
        query.web_url = web_url;
        indQuery = 1;
    }

    if (typeof email !== 'undefined') {
        query.email = email;
        indQuery = 1;
    }

    if (typeof telephone !== 'undefined') {
        query.telephone = telephone;
        indQuery = 1;
    }

    if (typeof opening_hours !== 'undefined') {
        query.opening_hours = opening_hours;
        indQuery = 1;
    }

    if (typeof register_date !== 'undefined') {
        query.register_date = register_date;
        indQuery = 1;
    }

    if (typeof rate_visit !== 'undefined') {
        query.rate_visit = rate_visit;
        indQuery = 1;
    }

    if (typeof rate_hour !== 'undefined') {
        query.rate_hour = rate_hour;
        indQuery = 1;
    }

    if (typeof rate_notes !== 'undefined') {
        query.rate_notes = rate_notes;
        indQuery = 1;
    }

    if (typeof rating_accumulated !== 'undefined') {
        query.rating_accumulated = rating_accumulated;
        indQuery = 1;
    }

    if (typeof rating_votes !== 'undefined') {
        query.rating_votes = rating_votes;
        indQuery = 1;
    }

    if (typeof rating !== 'undefined') {
        query.rating = rating;
        indQuery = 1;
    }

    if (typeof req.query.min !== 'undefined') {
        min = req.query.min;
    }

    if (typeof req.query.max !== 'undefined') {
        max = req.query.max;
    }

    if (DEBUG_TRACE_LEVEL >= 2) {
        console.log('user_id', user_id);
        console.log('user_name', user_name);
        console.log('category', category);
        console.log('subcategory', subcategory);
        console.log('corp_name', corp_name);
        console.log('description', description);
        console.log('fiscal_id', fiscal_id);
        console.log('street', street);
        console.log('postal_code', postal_code);
        console.log('area', area);
        console.log('city', city);
        console.log('province', province);
        console.log('gps_lat', gps_lat);
        console.log('gps_lon', gps_lon);
        console.log('web_url', web_url);
        console.log('email', email);
        console.log('telephone', telephone);
        console.log('opening_hours', opening_hours);
        console.log('register_date', register_date);
        console.log('rate_visit', rate_visit);
        console.log('rate_hour', rate_hour);
        console.log('rate_notes', rate_notes);
        console.log('rating_accumulated', rating_accumulated);
        console.log('rating_votes', rating_votes);
        console.log('rating', rating);
        console.log('min',min);
        console.log('max',max);
        console.log('sort',sort);
        console.log('page',page);
        console.log('size',size);
        console.log('skip',skip);
        console.log('limit',limit);
        console.log('fields',fields);
    }

    if (counterCoor < 2) {
        if (DEBUG_TRACE_LEVEL >= 1) {
            console.log('1.professionals.get standard find');
        }
        list(Professional, query, sort, limit, skip, fields, (err, professionals) => {
            Professional.populate(professionals, {path: "category",select: 'name'}, function(err,professionals) {
                Professional.populate(professionals, {
                    path: "subcategory",
                    select: 'name'
                }, function (err, professionals) {
                    Professional.populate(professionals, {
                        path: "demand",
                        select: 'title'
                    }, function (err, professionals) {
                        if (DEBUG_TRACE_LEVEL >= 1) {
                            console.log('1.professionals.get.list');
                        }

                        //Query if there was an error in the query
                        if (err) {
                            if (DEBUG_TRACE_LEVEL >= 1) {
                                console.log('2.Request failed');
                            }

                            return errorHandler(new Error('Request failed'), "An error occurred in the query", res, 500);
                        }

                        //There was no error in the query
                        //It is checked if professionals have recovered
                        if (professionals.length === 0) {
                            if (DEBUG_TRACE_LEVEL >= 1) {
                                console.log('3.No professionals found');
                            }

                            return errorHandler(new Error('No professionals found'), "No professionals were found with the search parameters indicated", res, 404);
                        }

                        //It responds with a JSON with the information retrieved from the BBDD
                        if (DEBUG_TRACE_LEVEL >= 1) {
                            console.log('4.Professionals have recovered. professionals: ', professionals);
                        }

                        return responseHandler('Professionals have recovered', res, 200, professionals, parameters.models.professionals, page);
                    })
                })
            })
        });
    } else {
        console.log('1');
        let filter = [{
            $geoNear: {
                near: { type: "Point",coordinates: [parseFloat(gps_lon), parseFloat(gps_lat)] }
                ,minDistance: min /* Distancia mínima en metros */
                //,maxDistance: max /* Distancia máxima en metros */
                ,spherical: true /* tipo de búsqueda. Mejor no tocar esto */
                ,distanceField: "distance" /* Campo en el que se añade la distancia calculada */
                //,distanceMultiplier: 0.001 /* Multiplicador para mostrar la distancia en diferentes magnitudes. Por defecto está en metros, para kilometros poner 0.001 */
                //,num: size /* Número máximo de registros que se quieren recuperar */
                //,"includeLocs": "dist.location" /* Campo en el que se mostrará la localización del punto */
            }}];

        if (indQuery === 1) {
            filter[0].$geoNear.query = query; /* Consulta de parámetros */
        }

        if (skip !== null) {
            filter[1] = { $skip: skip };
        }

        if (limit !== null) {
            filter[2] = { $limit: limit };
        }

        if (fields !== null) {
            filter[3] = { $fields: fields };
        }



        Professional.aggregate([filter], function(err,professionals) {
                Professional.populate(professionals, {path: "category",select: 'name'}, function(err,professionals) {
                    Professional.populate(professionals, {path: "subcategory", select: 'name'}, function (err, professionals) {
                        Professional.populate(professionals, {path: "demand", select: 'title'}, function (err, professionals) {
                            //Query if there was an error in the query
                            if (err) {
                                if (DEBUG_TRACE_LEVEL >= 1) {
                                    console.log('2.Request failed');
                                }

                                return errorHandler(new Error('Request failed'), "An error occurred in the query", res, 500);
                            }

                            //There was no error in the query
                            //It is checked if professionals have recovered
                            if (professionals.length === 0) {
                                if (DEBUG_TRACE_LEVEL >= 1) {
                                    console.log('3.No professionals found');
                                }

                                return errorHandler(new Error('No professionals found'), "No professionals were found with the search parameters indicated", res, 404);
                            }

                            //It responds with a JSON with the information retrieved from the BBDD
                            if (DEBUG_TRACE_LEVEL >= 1) {
                                console.log('4.Professionals have recovered. professionals: ', professionals);
                            }

                            return responseHandler('Professionals have recovered', res, 200, professionals, parameters.models.professionals, page);
                        })
                    })
                })
        });
    }
}

module.exports = {
    getProfessionals,
    saveProfessional,
    editProfessional,
    deleteProfessional
};