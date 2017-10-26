"use strict";

var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var addressSchema = Schema({

    description: String,
    userId: String,
    street: String,
    area: String,
    city : String,
    province: String,
    country : String,
    postalCode: Number,
    gps_lat: Number,
    gps_lon: Number,
    modificationDay:{type: Date, default: Date.now }

}, {
    versionKey: false   // No añade parámetro de version (__v)

});

// Export schema
var Address = mongoose.model('Address', addressSchema);

