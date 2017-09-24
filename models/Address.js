"use strict";

var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var addressSchema = Schema({

    user: { type: Schema.ObjectId, ref: "User" },
    street: String,
    area: String,
    city: String,
    // city : [{type: Schema.ObjectId, ref: "City" }],
    province: String,
    // province : [{type: Schema.ObjectId, ref: "Province" }],
    postalCode: Number,
    gps: Object,
    country: String,
    created:{type: Date, default: Date.now }
    // country : [{type: Schema.ObjectId, ref: "Country" }],

}, {
    versionKey: false   // No añade parámetro de version (__v)

});

// Export schema
var Address = mongoose.model('Address', addressSchema);

