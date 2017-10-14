"use strict";

var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var User = mongoose.model('User');

let getList = require('./../../../../controllers/getRoute');
let postRoute = require('./../../../../controllers/postRoute');
let putRoute = require('./../../../../controllers/putRoute');
let deleteRoute = require('./../../../../controllers/deleteRoute');

let model = User;

let UserController = require('./../../../../controllers/users/users'); // Load the controller module


router.get('/', function (req, res, next) {

    let sort = "name";
    getList(model, req, res, next, sort)
        .then(function (users) {
            return User.populate(users, {path: "addresses", select: "description"});
        })
        .then(function (users) {
            return User.populate(users, {path: "professionals", select: ["description", "subcategory"]});
        })
        .then(function (users) {
            return User.populate(users, {path: "favorites", select: ["description", "subcategory"]});
        })
        .then(function (users) {
            return User.populate(users, {path: "creditCards", select: "cardNumber"});
        })
        .then(function (users) {
            return User.populate(users, {path: "demands", select: ["title", "active"]});
        })
        .then(function (users) {
            res.json({
                "headerData": {
                    success: true
                },
                "listUsersOutputType": {
                    "users": users
                }
            })
        }).catch(next);

});

router.post('/', UserController.saveUser);

router.put('/:id', function (req, res, next) {
    var id = req.params.id;
    putRoute(model, id, req, res, next);

});

router.delete('/:id', function (req, res, next) {
    var id = req.params.id;
    deleteRoute(model, id, req, res, next);

});



module.exports = router;