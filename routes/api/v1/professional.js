'use strict';

let express = require('express');
let api = express.Router();

let ProfessionalController = require('./../../../controllers/professionals/professionals'); // Load the controller module

// Professionals routes established
api.get('/professionals', ProfessionalController.getProfessionals);
api.post('/professionals', ProfessionalController.saveProfessional);
api.put('/professionals', ProfessionalController.editProfessional);
api.delete('/professionals', ProfessionalController.deleteProfessional);

module.exports = api;