'use strict';

var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Professional = mongoose.model('Professional');


// List professionals

router.get('/getProfessionals', function(req, res, next) {

    var user_id = req.query.user_id;
    var category = req.query.category;
    var subcategory = req.query.subcategory;
    var coord = req.query.coord;

    var sort = req.query.sort || null;
    var limit = req.query.limit || null;
    var skip = parseInt(req.query.skip) || 0;
    var fields = req.query.fields || null;

    var filter = {};

    if (typeof user_id !== 'undefined') {
        filter.user_id = user_id;
    }

    if (typeof category !== 'undefined') {
        filter.category = category;
    }

    if (typeof subcategory !== 'undefined') {
        filter.subcategory = subcategory;
    }

    if (typeof coord !== 'undefined') {
        filter.coord = coord;
    }

    Professional.list(filter, sort, limit, skip, fields)
        .then(function (professionals) {
            res.json({
                "headerData": {
                    success: true
                    // numero de registros que se envían (PAGINACIÓN)
                },
                "listProfessionalsOutputType": {
                    "professionals" : professionals
                }
            })
        }).catch(next);

});



// Insert professional service
router.post('/postProfessional', function(req, res, next) {

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
router.put('/putProfessional', function(req, res, next) {
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
router.delete('/:id', function(req, res, next) {
    var id = req.params.id;
    Agente.remove({_id: id}, function(err, result) {
        if (err) {
            return next(err);
        }
        res.json({succes: true, result: result});
    });
});



module.exports = router;
