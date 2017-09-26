"use strict";

var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var CreditCard = mongoose.model('CreditCard');

let getList = require('./../../../../controllers/getRoute');
let postRoute = require('./../../../../controllers/postRoute');
let putRoute = require('./../../../../controllers/putRoute');
let deleteRoute = require('./../../../../controllers/deleteRoute');

let model = CreditCard;


router.get('/', function (req, res, next) {

    let sort = null;
    getList(model, req, res, next, sort)
        .then(function (creditcards) {
            res.json({
                "headerData": {
                    success: true,
                    "pagination": {
                        "paginationFlag": false,
                        "paginationKey": ""
                    }
                },
                "listCreditCardsOutputType": {
                    "creditcards": creditcards
                }
            })
        }).catch(next);

});


router.post('/', function (req, res, next) {
    let newModel = new CreditCard(req.body);
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
