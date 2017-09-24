"use strict";

var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var User = mongoose.model('User');


router.get('/', function (req, res, next) {

    var sort = req.query.sort || null;
    var limit = req.query.limit || null;
    var skip = parseInt(req.query.skip) || 0;
    var fields = req.query.fields || null;

    var id = req.query.id;

    var filter = {};

    if (typeof id !== 'undefined') {
        filter._id = id;
    }

    User.list(filter, sort, limit, skip, fields)
        .then(function (users) {
            return User.populate(users, {path: "addresses"});
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


router.post('/', function (req, res, next) {

    var user = new User(req.body);
    user.save(function (err, userSave) {
        if (err) {
            next(err);
            return;
        }
        res.json({success: true, user: userSave});
    })
});


router.put('/:id', function (req, res, next) {

    var id = req.params.id;
    User.update({_id: id}, req.body, function(err, user) {
        if (err) {
            next(err);
            return;
        }
        res.json({success: true, user: user});
    });

});


router.delete('/:id', function (req, res, next) {

    var id = req.params.id;
    User.remove({_id: id}, function(err, user) {
        if (err) {
            next(err);
            return;
        }
        res.json({success: true, user: user});
    });

});



module.exports = router;