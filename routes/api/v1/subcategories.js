"use strict";

var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Subcategory = mongoose.model('Subcategory');

let getList = require('./../../../controllers/getRoute');
let postRoute = require('./../../../controllers/postRoute');
let putRoute = require('./../../../controllers/putRoute');
let deleteRoute = require('./../../../controllers/deleteRoute');

let model = Subcategory;


router.get('/', function (req, res, next) {

    let sort = "name";
    getList(model, req, res, next, sort)
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
    let newModel = new Subcategory(req.body);
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
