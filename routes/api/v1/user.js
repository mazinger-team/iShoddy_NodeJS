"use strict";

var express = require('express');
var mongoose = require('mongoose');

var {authenticate} = require('../../../middleware/authenticate');
// var {User} = require('./../../../../models/User');

const {ObjectID} = require('mongodb');
const _ = require('lodash');

var router = express.Router();
var User = mongoose.model('User');

// let getList = require('./../../../../controllers/getRoute');
// let postRoute = require('./../../../../controllers/postRoute');
// let putRoute = require('./../../../../controllers/putRoute');
// let deleteRoute = require('./../../../../controllers/deleteRoute');

// let model = User;

// let UserController = require('./../../../../controllers/users/users'); // Load the controller module


// router.get('/', function (req, res, next) {
//
//     let sort = "name";
//     getList(model, req, res, next, sort)
//         .then(function (users) {
//             return User.populate(users, {path: "addresses", select: "description"});
//         })
//         .then(function (users) {
//             return User.populate(users, {path: "professionals", select: ["description", "subcategory"]});
//         })
//         .then(function (users) {
//             return User.populate(users, {path: "favorites", select: ["description", "subcategory"]});
//         })
//         .then(function (users) {
//             return User.populate(users, {path: "creditCards", select: "cardNumber"});
//         })
//         .then(function (users) {
//             return User.populate(users, {path: "demands", select: ["title", "active"]});
//         })
//         .then(function (users) {
//             res.json({
//                 "headerData": {
//                     success: true
//                 },
//                 "listUsersOutputType": {
//                     "users": users
//                 }
//             })
//         }).catch(next);
//
// });

// router.post('/', UserController.saveUser);
//
// router.put('/:id', function (req, res, next) {
//     var id = req.params.id;
//     putRoute(model, id, req, res, next);
//
// });
//
// router.delete('/:id', function (req, res, next) {
//     var id = req.params.id;
//     deleteRoute(model, id, req, res, next);
//
// });

router.post('/', (req, res) => {

    console.log('entrando a /user');

    var body = _.pick(req.body, ['email', 'password']);
    var user = new User(body);

    user.save().then(() => {
        return user.generateAuthToken();
    }).then((token) => {
        res.header('x-auth', token).send(user);
    }).catch((e) => {
        res.status(400).send(e);
    })
});

router.post('/login', (req, res) => {

    var body = _.pick(req.body, ['email', 'password']);

    User.findByCredentials(body.email, body.password).then((user) => {

        return user.generateAuthToken().then((token) => {
            res.header('x-auth', token).send(user);
        });

    }).catch((e) => {
        res.status(400).send();
    });
});

router.get('/me', authenticate, (req, res) => {
    res.send(req.user);
});

router.delete('/logout', authenticate, (req, res) => {
    req.user.removeToken(req.token).then(() => {
        res.status(200).send();
    }, () => {
        res.status(400).send();
    });
});

module.exports = router;






























