"use strict";

var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Offer = mongoose.model('Offer');

let getList = require('./../../../controllers/getRoute');
let postRoute = require('./../../../controllers/postRoute');
let putRoute = require('./../../../controllers/putRoute');
let deleteRoute = require('./../../../controllers/deleteRoute');

let model = Offer;


router.get('/', function (req, res, next) {

    let sort = null;
    getList(model, req, res, next, sort)
        .then(function (offers) {
            return Offer.populate(offers, {path: "offerConcept" });
        })
        .then(function (offers) {
            res.json({
                "headerData": {
                    success: true,
                    "pagination": {
                        "paginationFlag": false,
                        "paginationKey": ""
                    }
                },
                "listOffersOutputType": {
                    "offers": offers
                }
            })
        }).catch(next);

});


router.post('/', function (req, res, next) {
    let newModel = new Offer(req.body);
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
