"use strict";

var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Category = mongoose.model('Category');


router.get('/', function (req, res, next) {

    var sort = "name";
    var limit = req.query.limit || null;
    var skip = parseInt(req.query.skip) || 0;
    var fields = req.query.fields || null;
    var id = req.query.id;

    var filter = {};

    if (typeof id !== 'undefined') {
        filter._id = id;
    }


    Category.list(filter, sort, limit, skip, fields)
        .then(function (categories) {
            return Category.populate(categories, {path: "subcategories" });
        })
        .then(function (categories) {
            res.json({
                "headerData": {
                    success: true,
                    "pagination": {
                        "paginationFlag": false,
                        "paginationKey": ""
                    }
                },
                "listCategoryOutputType": {
                    "categories": categories
                }
            })
        }).catch(next);

});


router.post('/', function (req, res, next) {

    var category = new Category(req.body);
    category.save(function (err, categorySave) {
        if (err) {
            next(err);
            return;
        }
        res.json({success: true, category: categorySave});
    })
});


router.put('/:id', function (req, res, next) {

    var id = req.params.id;
    Category.update({_id: id}, req.body, function(err, category) {
        if (err) {
            next(err);
            return;
        }
        res.json({success: true, category: category});
    });

});


router.delete('/:id', function (req, res, next) {

    var id = req.params.id;
    Category.remove({_id: id}, function(err, category) {
        if (err) {
            next(err);
            return;
        }
        res.json({success: true, category: category});
    });

});




module.exports = router;
