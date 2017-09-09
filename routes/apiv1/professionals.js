'use strict';

var express = require('express');
var routes = express.Router();




routes.get('/getAllProfessional', function(req, res, next) {
    res.send(data.postListProfessionals);
});




module.exports = routes;
