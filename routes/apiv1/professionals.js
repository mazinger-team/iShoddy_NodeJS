'use strict';

let express = require('express');
let router = express.Router();

let mongoose = require('mongoose');
let Professional = mongoose.model('Professional');

let num_rows = require('../../config/local_config').num_rows;

// List professionals

router.get('/professionals', function(req, res, next) {

    // Professional filter
    let user_id= req.query.user_id,
        user_name= req.query.user_name,
        category= req.query.category,
        subcategory= req.query.subcategory,
        corp_name= req.query.corp_name,
        description= req.query.description,
        fiscal_id= req.query.fiscal_id,
        street= req.query.street,
        postal_code= req.query.postal_code,
        area= req.query.area,
        city= req.query.city,
        province= req.query.province,
        gps_lat= req.query.gps_lat,
        gps_lon= req.query.gps_lon,
        web_url= req.query.web_url,
        email= req.query.email,
        telephone= req.query.telephone,
        opening_hours= req.query.opening_hours,
        register_date= req.query.register_date,
        rate_visit= req.query.rate_visit,
        rate_hour= req.query.rate_hour,
        rate_notes= req.query.rate_notes,
        rating_accumulated= req.query.rating_accumulated,
        rating_votes= req.query.rating_votes,
        rating= req.query.rating;

    // Geo params
    let min = req.query.min || 0,
        max = req.query.max || 1000000000;

    // Query params
    let sort = req.query.sort || null,
        page = parseInt(req.query.page || 0),
        size = num_rows,
        skip = page > 0 ? ((page - 1) * size) : 0,
        limit = req.query.limit || num_rows,
        fields = req.query.fields || null;

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

    if (counterCoor < 2) {
        Professional.find(query, sort, limit, skip, fields)
            .then(function (professionals) {
                res.json({
                    "headerData": {
                        pagination: {
                            paginationFlag: professionals.length === size,
                            paginationKey: page,
                            paginationElements: professionals.length
                        }
                    },
                    "listProfessionalsOutputType": {
                        "professionals" : professionals
                    }
                })
            }).catch(next);
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

        console.log('sort', sort);
        console.log('size', size);
        console.log('skip', skip);
        console.log('limit', limit);
        console.log('fields', fields);

        if (skip !== null) {
            console.log('1.skip');
            filter[1] = { $skip: skip };
        }

        if (limit !== null) {
            console.log('1.limit');
            filter[2] = { $limit: limit };
        }

        if (fields !== null) {
            console.log('1.fields');
            filter[3] = { $fields: fields };
        }

        Professional.aggregate([filter
            ],// Sort nearest first
            function(err,professionals) {
                res.json({
                    "headerData": {
                        pagination: {
                            paginationFlag: professionals.length === size,
                            paginationKey: page,
                            paginationElements: professionals.length
                        }
                    },
                    "listProfessionalsOutputType": {
                        "professionals" : professionals
                    }
                })
            });
    }
});



// Insert professional service
router.post('/professionals', function(req, res, next) {

    var professional = new Professional(req.body);

    professional.save(function (err, professionalSave) {
        if (err) {
            next(err);
            return;
        }
        res.json({success: true, professional: professionalSave});
    })
});


// Update professional service
router.put('/professionals', function(req, res, next) {
    var id = req.params.id;
    Professional.update({_id: id}, req.body, function(err, professional) {
        if (err) {
            next(err);
            return;
        }
        res.json({success: true, professional: professional});
    });
});

// Delete professional service
router.delete('/professionals/:id', function(req, res, next) {
    var id = req.params.id;
    Agente.remove({_id: id}, function(err, result) {
        if (err) {
            return next(err);
        }
        res.json({succes: true, result: result});
    });
});




module.exports = router;
