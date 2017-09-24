"use strict";

var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Subcategory = mongoose.model('Subcategory');


router.get('/', function (req, res, next) {

    var sort = "name";
    var limit = req.query.limit || null;
    var skip = parseInt(req.query.skip) || 0;
    var fields = req.query.fields || null;

    var id = req.query.id;
    var category = req.query.category;

    var filter = {};

    if (typeof id !== 'undefined') {
        filter._id = id;
    }

    if (typeof category !== 'undefined') {
        filter.category = category;
    }

    Subcategory.list(filter, sort, limit, skip, fields)
        .then(function (subcategories) {
            return Subcategory.populate(subcategories, {path: "category", select: "name"});
        })
        .then(function (subcategories) {
            res.json({
                "headerData": {
                    success: true
                },
                "listSubcategoryOutputType": {
                    "subcategories": subcategories
                }
            })
        }).catch(next);

});


router.post('/', function (req, res, next) {

    var subcategory = new Subcategory(req.body);
    subcategory.save(function (err, subcategorySave) {
        if (err) {
            next(err);
            return;
        }
        res.json({success: true, subcategory: subcategorySave});
    })

});


router.put('/:id', function (req, res, next) {

    var id = req.params.id;
    Subcategory.update({_id: id}, req.body, function(err, subcategory) {
        if (err) {
            next(err);
            return;
        }
        res.json({success: true, subcategory: subcategory});
    });

});


router.delete('/:id', function (req, res, next) {

    var id = req.params.id;
    Subcategory.remove({_id: id}, function(err, subcategory) {
        if (err) {
            next(err);
            return;
        }
        res.json({success: true, subcategory: subcategory});
    });

});



module.exports = router;
