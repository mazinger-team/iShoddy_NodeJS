"use strict";

var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Demand = mongoose.model('Demand');

let getList = require('./../../../../controllers/getRoute');
let postRoute = require('./../../../../controllers/postRoute');
let putRoute = require('./../../../../controllers/putRoute');
let deleteRoute = require('./../../../../controllers/deleteRoute');

let model = Demand;


router.get('/', function (req, res, next) {

    let sort = null;
    getList(model, req, res, next, sort)
        .then(function (demands) {
            return Demand.populate(demands, {path: "professionals", select: "corp_name"});
        })
        .then(function (demands) {
            return Demand.populate(demands, {path: "offers", select: ["title", "totalPrize"]});
        })
        .then(function (demands) {
            return Demand.populate(demands, {path: "category", select: "name"});
        })
        .then(function (demands) {
            return Demand.populate(demands, {path: "subcategory", select: "name"});
        })
        .then(function (demands) {
            res.json({
                "headerData": {
                    success: true,
                    "pagination": {
                        "paginationFlag": false,
                        "paginationKey": ""
                    }
                },
                "listDemandsOutputType": {
                    "demands": demands
                }
            })
        }).catch(next);

});


router.post('/', function (req, res, next) {
    let newModel = new Demand(req.body);
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
