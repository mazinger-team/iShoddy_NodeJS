var express = require('express');
var fs = require('fs');


/*var data = {
    postListProfessionals: JSON.parse(fs.readFileSync(__dirname + '/listProfessionalsGeneral.json', 'utf8'))
};*/

getAllProfessionals = function(req, res, next) {
    //res.send(data.getLoginProfessional);
  };

  
getProfessionalsByCategory =  function(req, res, next) {
    //res.send(data.getLoginProfessional);
  };
  
  


module.exports = { getAllProfessionals, getProfessionalsByCategory };