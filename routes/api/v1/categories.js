"use strict";

var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Category = mongoose.model('Category');

let getList = require('./../../../controllers/getRoute');
let postRoute = require('./../../../controllers/postRoute');
let putRoute = require('./../../../controllers/putRoute');
let deleteRoute = require('./../../../controllers/deleteRoute');

let model = Category;


router.get('/', function (req, res, next) {

    let sort = "name";
    getList(model, req, res, next, sort)
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
    let newModel = new Category(req.body);
    postRoute(newModel, req, res, next);
});


router.put('/:id', function (req, res, next) {
    var id = req.params.id;
    putRoute(model, id, req, res, next);

});


router.delete('/:id', function (req, res, next) {
    var id = req.params.id;
    deleteRoute(model, id, req, res, next);

});



module.exports = router;
